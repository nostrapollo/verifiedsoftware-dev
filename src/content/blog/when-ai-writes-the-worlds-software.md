---
title: "When AI Writes the World's Software, Who Checks the Math?"
description: "The practitioner's guide to formally verified software in 2026."
date: 2026-03-03
author: "Brendan"
tags: ["verification", "lean", "ai"]
draft: true
---

## The scale of AI-generated code

Google reports 25% of new code is AI-generated. Microsoft says 30%. AWS is migrating millions of lines of COBOL with AI agents. Anthropic built a C compiler using Claude. The shift isn't coming — it's here.

## The verification gap

Heartbleed lived in OpenSSL for two years. It was a simple bounds-check failure — the kind of bug that formal verification trivially prevents. As AI generates code faster than humans can review it, the "Accept All" culture around AI suggestions is creating a new category of risk: workslop.

## Why testing isn't enough

Tests give confidence. Proofs give guarantees. A test suite checks specific inputs; a proof covers every possible input. More critically, AI can overfit to test suites — generating code that passes tests while containing subtle logical errors that only manifest in production.

## What formal verification actually is

Formal verification encodes your software's behavior as mathematical theorems, then uses automated tools to check that the proofs hold. Think of it as a type system taken to its logical extreme: instead of just checking that a function returns an integer, you can prove that it returns the *correct* integer for every possible input.

## The Lean ecosystem

Lean 4 has emerged as the lingua franca of practical formal verification. Why? It's a real programming language — not just a proof assistant. Mathlib contains over 200,000 formalized theorems. And critically, AI models can read and write Lean effectively. The zlib experiment proved this: an AI agent converted production C compression code to Lean with machine-checked correctness proofs, requiring minimal human guidance.

## AI that proves its own work

The most exciting development isn't AI writing code — it's AI proving that code correct. LeanAgent automates the discovery and proof of mathematical theorems. LeanDojo provides infrastructure for training AI on Lean proofs. AlphaProof earned an IMO silver medal. TorchLean is building verified neural network implementations. The loop is closing: AI writes code, AI proves it correct, humans verify the proof is about the right property.

## The verified stack roadmap

Verification is spreading bottom-up through the software stack. Cryptography comes first (highest consequence per line of code). Then core libraries and compression (widely depended upon). Authorization and access control (security-critical). The frontier is moving toward parsers, storage engines, compilers, and eventually neural networks themselves.

## What this means for practitioners

You probably won't write Lean. But your dependencies will be verified in Lean. The shift is analogous to how most developers don't write assembly, but they depend on verified compilers. The practical question isn't "should I learn Lean?" but "which of my critical dependencies will be verified first, and how does that change my risk model?"
