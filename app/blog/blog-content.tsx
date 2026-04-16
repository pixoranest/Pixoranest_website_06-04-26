"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
    <main className="pt-24 bg-background">

      {/* SEO INTRO SECTION */}
      <section className="px-4 pb-6 pt-12 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl animate-fade-up">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            PixoraNest AI Automation Blog
          </h1>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Learn how businesses worldwide are transforming operations using
            AI automation, WhatsApp automation, AI voice agents, and intelligent
            workflow systems. Discover strategies to increase leads, automate
            customer communication, and scale your business using modern AI tools.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-up">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-label={`Filter blog posts by ${cat}`}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">

          {/* FEATURED BLOG — horizontal card, image left, content right */}
          {isAllPosts && featuredPost && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30"
            >
              <div className="grid md:grid-cols-[2fr_3fr]">
                {/* Image — left side */}
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[240px]">
                  <Image
                    src={getBlogImage(featuredPost.slug)}
                    alt={`${featuredPost.title} – PixoraNest AI Automation Blog`}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 40vw"
                    priority
                  />
                </div>

                {/* Content — right side */}
                <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
                      Featured
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {featuredPost.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" aria-hidden="true" />
                      {featuredPost.author}
                    </span>
                    <span className="h-3 w-px bg-border" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read Article
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* BLOG GRID — 3 col desktop, 2 tablet, 1 mobile */}
          <section
            aria-label="Blog posts grid"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {gridPosts.map((post) => (
              <article key={post.slug} className="flex">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
                >
                  {/* Image — dominant top section */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                    <Image
                      src={getBlogImage(post.slug)}
                      alt={`${post.title} – PixoraNest AI Automation Blog`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    {/* Category badge overlaid on image, top-left */}
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    {/* Title */}
                    <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Meta footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/60 mt-1 text-[11px] text-muted-foreground">
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
              </article>
            ))}
          </section>

        </div>
      </div>
    </main>
  )
}