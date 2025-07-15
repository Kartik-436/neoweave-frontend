"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useThemeChange } from "../End/ThemeChangeContext"

// Helper Interfaces & Classes (Particle class remains the same)
// =============================================================

interface Vector2D {
    x: number
    y: number
}

class Particle {
    pos: Vector2D = { x: 0, y: 0 }
    vel: Vector2D = { x: 0, y: 0 }
    acc: Vector2D = { x: 0, y: 0 }
    target: Vector2D = { x: 0, y: 0 }

    closeEnoughTarget = 100
    maxSpeed = 1.0
    maxForce = 0.1
    particleSize = 10
    isKilled = false

    startColor = { r: 0, g: 0, b: 0 }
    targetColor = { r: 0, g: 0, b: 0 }
    colorWeight = 0
    colorBlendRate = 0.01

    move() {
        let proximityMult = 1
        const distance = Math.sqrt(
            Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2)
        )

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        const towardsTarget = {
            x: this.target.x - this.pos.x,
            y: this.target.y - this.pos.y,
        }

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        }

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce
            steer.y = (steer.y / steerMagnitude) * this.maxForce
        }

        this.acc.x += steer.x
        this.acc.y += steer.y

        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        const currentColor = {
            r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
            g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
            b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
        }

        ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
        if (drawAsPoints) {
            ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
        } else {
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    kill(width: number, height: number) {
        if (!this.isKilled) {
            const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y
            this.startColor = {
                r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
            }
            this.targetColor = { r: 0, g: 0, b: 0 }
            this.colorWeight = 0
            this.isKilled = true
        }
    }

    private generateRandomPos(x: number, y: number, mag: number): Vector2D {
        const angle = Math.random() * Math.PI * 2
        return {
            x: x + Math.cos(angle) * mag,
            y: y + Math.sin(angle) * mag,
        }
    }
}

// Updated React Component
// =============================================================

interface ParticleTextEffectProps {
    words?: string[]
    delays?: number[]
    onComplete?: () => void
}

const DEFAULT_WORDS = ["Hello", "Welcome", "to", "NEOWEAVE"]
// Delays: before 1st word, before 2nd, before 3rd, before 4th, and after 4th (before blast)
const DEFAULT_DELAYS = [1100, 2000, 1800, 1000, 3500]


export function ParticleTextEffect({
    words = DEFAULT_WORDS,
    delays = DEFAULT_DELAYS,
    onComplete, // 1. Removed the default value from here
}: ParticleTextEffectProps) {
    const { isThemeDark, setIsThemeDark, isLoaded, setIsLoaded } = useThemeChange();

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(null)
    const particlesRef = useRef<Particle[]>([])
    const timeoutIdsRef = useRef<NodeJS.Timeout[]>([])
    const controls = useAnimation()

    const pixelSteps = 6
    const drawAsPoints = true

    // The 'nextWord' and 'animate' functions remain unchanged.
    // ...
    const nextWord = (word: string, canvas: HTMLCanvasElement) => {
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = canvas.width
        offscreenCanvas.height = canvas.height
        const offscreenCtx = offscreenCanvas.getContext("2d")!

        offscreenCtx.fillStyle = "white"
        offscreenCtx.font = "bold 100px Arial"
        offscreenCtx.textAlign = "center"
        offscreenCtx.textBaseline = "middle"
        offscreenCtx.fillText(word, canvas.width / 2, canvas.height / 2)

        const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        const newColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255 }
        const particles = particlesRef.current
        let particleIndex = 0

        const coordsIndexes: number[] = []
        for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
            if (pixels[i + 3] > 0) coordsIndexes.push(i)
        }

        for (let i = coordsIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
        }

        for (const coordIndex of coordsIndexes) {
            const x = (coordIndex / 4) % canvas.width
            const y = Math.floor(coordIndex / 4 / canvas.width)
            let particle: Particle

            if (particleIndex < particles.length) {
                particle = particles[particleIndex]
                particle.isKilled = false
                particleIndex++
            } else {
                particle = new Particle()
                const randomAngle = Math.random() * Math.PI * 2
                particle.pos.x = canvas.width / 2 + Math.cos(randomAngle) * (canvas.width / 2)
                particle.pos.y = canvas.height / 2 + Math.sin(randomAngle) * (canvas.height / 2)
                particle.maxSpeed = Math.random() * 6 + 4
                particle.maxForce = particle.maxSpeed * 0.05
                particle.particleSize = Math.random() * 6 + 6
                particle.colorBlendRate = Math.random() * 0.0275 + 0.0025
                particles.push(particle)
            }

            particle.startColor = {
                r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
                g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
                b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
            }
            particle.targetColor = newColor
            particle.colorWeight = 0
            particle.target.x = x
            particle.target.y = y
        }

        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height)
        }
    }

    const animate = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")!
        const particles = particlesRef.current

        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i]
            particle.move()
            particle.draw(ctx, drawAsPoints)

            if (
                particle.isKilled &&
                (particle.pos.x < 0 ||
                    particle.pos.x > canvas.width ||
                    particle.pos.y < 0 ||
                    particle.pos.y > canvas.height)
            ) {
                particles.splice(i, 1)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = 1000
        canvas.height = 500

        // This function is now corrected
        const blastAndFadeOut = async () => {
            console.log("Blasting off! 🚀")
            const particles = particlesRef.current
            particles.forEach((p) => p.kill(canvas.width, canvas.height))

            await controls.start({
                display: "none",
                opacity: 0,
                transition: { duration: 1.5, ease: "easeInOut" },
            })

            // 2. Set the component's internal state directly
            setIsLoaded(true)

            // 3. Call the optional onComplete prop if it was provided
            if (onComplete) {
                onComplete()
            }
        }

        let cumulativeDelay = 0
        words.forEach((word, index) => {
            const delay = delays[index] || 3000
            cumulativeDelay += delay
            const timeoutId = setTimeout(() => {
                nextWord(word, canvas)
            }, cumulativeDelay)
            timeoutIdsRef.current.push(timeoutId)
        })

        const finalDelay = delays[words.length] || 3000
        cumulativeDelay += finalDelay
        const finalTimeoutId = setTimeout(blastAndFadeOut, cumulativeDelay)
        timeoutIdsRef.current.push(finalTimeoutId)

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            timeoutIdsRef.current.forEach(clearTimeout)
        }
    }, [words, delays, onComplete, controls, setIsLoaded]) // Added setIsLoaded to dependency array for correctness

    return (
        <motion.div
            className="flex flex-col fixed top-0 left-0 z-[99999] items-center justify-center min-w-screen min-h-screen bg-black"
            initial={{ opacity: 1 }}
            animate={controls}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-screen"
            />
        </motion.div>
    )
}
