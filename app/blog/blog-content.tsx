"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper } from "@/components/section-wrapper"
import { blogPosts, blogCategories } from "@/lib/data"
import { ArrowRight, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { getBlogImage } from "@/lib/blog-articles"

export function BlogPageContent() {
  const [activeCategory, setActiveCategory] = useState("All Posts")

  const filteredPosts =
    activeCategory === "All Posts"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory)

  const isAllPosts = activeCategory === "All Posts"

  const featuredPost =
    isAllPosts
      ? blogPosts.find((p) => p.featured) || blogPosts[0]
      : null

  const gridPosts = filteredPosts.filter(
    (p) => !featuredPost || p.slug !== featuredPost.slug
  )

  return (
    <main className="pt-24">

      {/* SEO INTRO SECTION */}
      <section className="px-4 pb-6 pt-12 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            PixoraNest AI Automation Blog
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Learn how businesses worldwide are transforming operations using
            AI automation, WhatsApp automation, AI voice agents, and intelligent
            workflow systems. Discover strategies to increase leads, automate
            customer communication, and scale your business using modern AI tools.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-7xl"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-label={`Filter blog posts by ${cat}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <SectionWrapper>

        {/* FEATURED BLOG */}
        {isAllPosts && featuredPost && (
          <motion.section variants={fadeInUp} className="mb-12">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-primary/30"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src={getBlogImage(featuredPost.slug)}
                    alt={`${featuredPost.title} – PixoraNest AI Automation Blog`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px)100vw,50vw"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      Featured
                    </span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" aria-hidden="true" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read Article
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.section>
        )}

        {/* BLOG GRID */}
        <section
          aria-label="Blog posts grid"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {gridPosts.map((post) => (
            <motion.article key={post.slug} variants={fadeInUp}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/50 transition-all hover:border-primary/30"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getBlogImage(post.slug)}
                    alt={`${post.title} – PixoraNest AI Automation Blog`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {post.category}
                  </span>
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" aria-hidden="true" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </section>

      </SectionWrapper>
    </main>
  )
}