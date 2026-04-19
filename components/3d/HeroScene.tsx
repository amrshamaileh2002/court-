'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Scene + Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.set(0, 0, 5)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xe2ff67, 1.2)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    const backLight = new THREE.DirectionalLight(0x1645d3, 0.8)
    backLight.position.set(-4, -2, -4)
    scene.add(backLight)

    // Court lines (flat grid)
    const courtGroup = new THREE.Group()

    const courtMat = new THREE.MeshStandardMaterial({
      color: 0x122744,
      roughness: 0.8,
      metalness: 0.1,
    })
    const courtGeo = new THREE.PlaneGeometry(4, 6)
    const courtMesh = new THREE.Mesh(courtGeo, courtMat)
    courtMesh.rotation.x = -Math.PI / 2
    courtMesh.position.y = -1.5
    courtGroup.add(courtMesh)

    // Court line material
    const lineMat = new THREE.LineBasicMaterial({ color: 0xe2ff67, opacity: 0.5, transparent: true })

    const addLine = (points: THREE.Vector3[]) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      courtGroup.add(new THREE.Line(geo, lineMat))
    }

    // Court boundary
    const y = -1.49
    addLine([new THREE.Vector3(-2, y, 3), new THREE.Vector3(2, y, 3)])
    addLine([new THREE.Vector3(-2, y, -3), new THREE.Vector3(2, y, -3)])
    addLine([new THREE.Vector3(-2, y, -3), new THREE.Vector3(-2, y, 3)])
    addLine([new THREE.Vector3(2, y, -3), new THREE.Vector3(2, y, 3)])
    addLine([new THREE.Vector3(-2, y, 0), new THREE.Vector3(2, y, 0)])

    scene.add(courtGroup)
    courtGroup.rotation.x = 0.3
    courtGroup.position.y = -0.5

    // Floating spheres (court balls)
    const balls: { mesh: THREE.Mesh; vx: number; vy: number; vz: number; t: number }[] = []
    const ballColors = [0xe2ff67, 0x1645d3, 0x8bc4de, 0xe2ff67]

    for (let i = 0; i < 4; i++) {
      const geo = new THREE.SphereGeometry(0.08 + Math.random() * 0.06, 16, 16)
      const mat = new THREE.MeshStandardMaterial({
        color: ballColors[i],
        roughness: 0.3,
        metalness: 0.6,
        emissive: ballColors[i],
        emissiveIntensity: 0.15,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      )
      scene.add(mesh)
      balls.push({ mesh, vx: (Math.random() - 0.5) * 0.008, vy: (Math.random() - 0.5) * 0.008, vz: (Math.random() - 0.5) * 0.005, t: Math.random() * Math.PI * 2 })
    }

    // Particle field (stars / dust)
    const particleCount = 120
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const partMat = new THREE.PointsMaterial({ color: 0xe2ff67, size: 0.025, transparent: true, opacity: 0.35 })
    scene.add(new THREE.Points(partGeo, partMat))

    // Animation
    let raf: number
    const clock = new THREE.Clock()

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Slowly rotate court
      courtGroup.rotation.y = t * 0.08

      // Animate balls
      balls.forEach((b, i) => {
        b.t += 0.016
        b.mesh.position.x += b.vx
        b.mesh.position.y = Math.sin(b.t * 0.7 + i) * 0.6
        b.mesh.position.z += b.vz
        // Bounce
        if (Math.abs(b.mesh.position.x) > 2) b.vx *= -1
        if (Math.abs(b.mesh.position.z) > 2) b.vz *= -1
        b.mesh.rotation.x += 0.01
        b.mesh.rotation.y += 0.015
      })

      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="hero-canvas" />
}
