"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Check,
  ChevronRight,
  Linkedin,
  Facebook,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  Code2,
  Shield,
  Settings,
  GitBranch,
  FileText,
  Rocket,
  Filter,
  CalendarDays,
  Package,
  Megaphone,
  BookOpen,
} from "lucide-react"
import { fadeInUp, staggerContainer, slideInLeft } from "@/lib/animations"
import { cn } from "@/lib/utils"
import type { BlogArticle, ArticleSection } from "@/lib/blog-articles"
import { blogPosts } from "@/lib/data"
import { getBlogImage } from "@/lib/blog-articles"
import type { ReactNode } from "react"

/* ─── X / Twitter Icon ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/* ─── Icon Map ─── */
const iconMap: Record<string, ReactNode> = {
  Shield: <Shield className="h-5 w-5" />,
  Settings: <Settings className="h-5 w-5" />,
  GitBranch: <GitBranch className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Rocket: <Rocket className="h-5 w-5" />,
  Filter: <Filter className="h-5 w-5" />,
  Calendar: <CalendarDays className="h-5 w-5" />,
  Package: <Package className="h-5 w-5" />,
  Megaphone: <Megaphone className="h-5 w-5" />,
}

interface BlogArticleContentProps {
  post: (typeof blogPosts)[number]
  article: BlogArticle | null
  heroImage: string
  slug: string
}

export function BlogArticleContent({
  post,
  article,
  heroImage,
  slug,
}: BlogArticleContentProps) {
  const [activeSection, setActiveSection] = useState("")
  const [copied, setCopied] = useState(false)
  // FIX: shareUrl must be set client-side only to avoid SSR hydration mismatch
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const handleScroll = useCallback(() => {
    if (!article) return
    const sections = article.tableOfContents.map((item) => item.id)
    let current = ""
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) current = id
      }
    }
    setActiveSection(current)
  }, [article])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText = encodeURIComponent(post.title)

  const relatedPosts = article
    ? blogPosts.filter((p) => article.relatedSlugs.includes(p.slug))
    : blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  // Estimate reading time for display
  const wordCount =
    article?.sections
      ?.flatMap((s) => [
        s.content ?? "",
        ...(s.subsections?.map((ss) => ss.content) ?? []),
      ])
      .join(" ")
      .split(/\s+/).length ?? 0
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="pt-24">

      {/* ── Hero Section ── */}
      <section
        aria-labelledby="article-title"
        className="px-4 pb-8 pt-12 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={fadeInUp}
            aria-label="Breadcrumb"
            className="mb-6"
          >
            <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="truncate max-w-[200px] sm:max-w-xs">
                <span className="text-foreground font-medium">
                  {post.title}
                </span>
              </li>
            </ol>
          </motion.nav>

          {/* Back Link */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp} className="mb-4 flex flex-wrap gap-2">
            {(article?.tags ?? [post.category]).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* H1 */}
          <motion.h1
            id="article-title"
            variants={fadeInUp}
            className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          >
            {post.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="mb-6 text-lg leading-relaxed text-muted-foreground"
          >
            {article?.subtitle ?? post.excerpt}
          </motion.p>

          {/* Author & Meta
            NOTE: itemScope / itemProp microdata removed here.
            JSON-LD in page.tsx (BlogPosting schema) is the Google-preferred
            method. Having both causes duplicate / conflicting structured data.
          */}
          <motion.div
            variants={fadeInUp}
            className="mb-8 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
                <User className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <p className="text-xs">
                  {article?.authorRole ?? "AI Automation Expert, PixoraNest"}
                </p>
              </div>
            </div>

            <span
              className="hidden h-4 w-px bg-border sm:block"
              aria-hidden="true"
            />

            <time
              className="flex items-center gap-1.5"
              dateTime={article?.publishedDate ?? post.date}
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {post.date}
            </time>

            <span
              className="hidden h-4 w-px bg-border sm:block"
              aria-hidden="true"
            />

            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Image ── */}
      <section
        aria-label="Article hero image"
        className="px-4 pb-12 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border"
        >
          <Image
            src={heroImage}
            alt={`${post.title} – PixoraNest AI Automation`}
            width={1200}
            height={630}
            className="w-full h-auto object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
        </motion.div>
      </section>

      {/* ── Content Area with Sidebar ── */}
      <section
        aria-label="Article content"
        id="blog-content"
        className="px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-10 lg:gap-12">

            {/* Sidebar – Table of Contents */}
            {article && (
              <aside
                aria-label="Table of contents"
                className="hidden w-64 shrink-0 lg:block"
              >
                <div className="sticky top-24">
                  <motion.nav
                    variants={slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-xl border border-border bg-card/50 p-5"
                  >
                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <BookOpen
                        className="h-4 w-4 text-primary"
                        aria-hidden="true"
                      />
                      On This Page
                    </h2>
                    <ul className="flex flex-col gap-1">
                      {article.tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            aria-current={
                              activeSection === item.id ? "true" : undefined
                            }
                            className={cn(
                              "block rounded-lg px-3 py-2 text-xs font-medium leading-snug transition-all",
                              activeSection === item.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-card hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.nav>

                  {/* Sticky CTA */}
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                    <p className="mb-3 text-xs font-semibold text-foreground leading-snug">
                      Ready to automate your business?
                    </p>
                    <Link
                      href="/contact"
                      className="block w-full rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-all hover:bg-primary/90"
                    >
                      Book a Free Demo
                    </Link>
                    <Link
                      href="/solutions"
                      className="mt-2 block text-xs text-primary hover:underline"
                    >
                      Explore AI Solutions →
                    </Link>
                  </div>
                </div>
              </aside>
            )}

            {/* ── Main Article ──
              NOTE: itemScope / itemType microdata removed from <article>.
              JSON-LD in page.tsx is the single source of structured data.
              Duplicate microdata + JSON-LD causes Google Search Console warnings.
            */}
            <article
              aria-labelledby="article-title"
              className="min-w-0 flex-1"
            >
              {article ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.05 }}
                  className="flex flex-col gap-16"
                >
                  {article.sections.map((section) => (
                    <ArticleSectionBlock key={section.id} section={section} />
                  ))}
                </motion.div>
              ) : (
                <FallbackArticle post={post} />
              )}

              {/* FAQ Section */}
              {article?.faqs && article.faqs.length > 0 && (
                <motion.section
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-16"
                  aria-labelledby="faq-heading"
                >
                  <h2
                    id="faq-heading"
                    className="mb-8 text-2xl font-bold text-foreground sm:text-3xl"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="flex flex-col gap-4">
                    {article.faqs.map((faq, i) => (
                      <details
                        key={i}
                        className="group rounded-xl border border-border bg-card/50 p-5"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground">
                          {faq.question}
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Internal Links */}
              <motion.section
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 rounded-xl border border-border bg-card/50 p-6"
                aria-label="Related PixoraNest services"
              >
                <h2 className="mb-4 text-base font-semibold text-foreground">
                  Explore PixoraNest AI Automation Services
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    {
                      label: "FirstVoice – AI Receptionist for Business",
                      href: "/solutions/firstvoice",
                    },
                    {
                      label: "LeadNest – WhatsApp Lead Management",
                      href: "/solutions/leadnest",
                    },
                    {
                      label: "CallOrbit – AI Call Handling & Routing",
                      href: "/solutions/callorbit",
                    },
                    {
                      label: "EchoAssist – AI Voice Agent",
                      href: "/solutions/echoassist",
                    },
                    {
                      label: "Socialium – Social Media Automation",
                      href: "/solutions/socialium",
                    },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ChevronRight
                          className="h-3.5 w-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* CTA */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-16 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center sm:p-12"
              >
                <h2 className="mb-3 text-2xl font-bold text-foreground sm:text-3xl">
                  Ready to automate your business with AI?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Join hundreds of Indian startups and small businesses using
                  PixoraNest to automate WhatsApp, calls, and customer
                  communication — and grow 3x faster.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                  >
                    Book a Free Demo
                  </Link>
                  <Link
                    href="/solutions"
                    className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-card"
                  >
                    Explore AI Solutions
                  </Link>
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 flex flex-col items-center gap-4 border-t border-border pt-8"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Found this article helpful? Share it with your network.
                </span>
                <ShareButtons
                  shareUrl={shareUrl}
                  shareText={shareText}
                  copyLink={copyLink}
                  copied={copied}
                />
              </motion.div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <motion.section
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-16"
                  aria-labelledby="related-heading"
                >
                  <motion.h2
                    id="related-heading"
                    variants={fadeInUp}
                    className="mb-8 text-2xl font-bold text-foreground"
                  >
                    Related Articles
                  </motion.h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {relatedPosts.map((rp) => (
                      <motion.div key={rp.slug} variants={fadeInUp}>
                        <Link
                          href={`/blog/${rp.slug}`}
                          className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/50 transition-all hover:border-primary/30"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <Image
                              src={getBlogImage(rp.slug)}
                              alt={`${rp.title} – PixoraNest AI Automation Blog`}
                              fill
                              loading="lazy"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                            />
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <span className="mb-2 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              {rp.category}
                            </span>
                            <h3 className="mb-2 text-sm font-semibold text-foreground">
                              {rp.title}
                            </h3>
                            <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
                              {rp.excerpt}
                            </p>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              Read Article
                              <ChevronRight className="h-3 w-3" aria-hidden="true" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ─── Share Buttons ─── */
function ShareButtons({
  shareUrl,
  shareText,
  copyLink,
  copied,
}: {
  shareUrl: string
  shareText: string
  copyLink: () => void
  copied: boolean
}) {
  const encodedUrl = encodeURIComponent(shareUrl)

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Share this article"
    >
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Share this article on LinkedIn"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <Linkedin className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Share this article on X (Twitter)"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <XIcon className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Share this article on Facebook"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <Facebook className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Share this article on WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        <MessageCircle className="h-3.5 w-3.5" />
      </a>
      <button
        onClick={copyLink}
        aria-label={copied ? "Link copied!" : "Copy article link"}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <ExternalLink className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  )
}

/* ─── Article Section Renderer ─── */
function ArticleSectionBlock({ section }: { section: ArticleSection }) {
  return (
    <motion.section
      variants={fadeInUp}
      id={section.id}
      className="scroll-mt-24"
    >
      <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
        {section.title}
      </h2>

      {section.image && (
        <div className="my-10 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={section.image}
            alt={`${section.title} – PixoraNest AI Automation`}
            width={1200}
            height={600}
            className="rounded-xl object-cover w-full"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {section.content && (
        <div
          className="prose prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-primary prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )}

      {/* Subsections */}
      {section.subsections?.map((sub, i) => (
        <div key={`${section.id}-sub-${i}`} className="mb-6 mt-6">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            {sub.title}
          </h3>
          <div className="flex flex-col gap-3">
            {sub.content.split("\n\n").map((p, j) => (
              <p
                key={`${section.id}-sub-${i}-p-${j}`}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}

      {/* Stats Grid */}
      {section.type === "stats" && section.stats && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {section.stats.map((stat, i) => (
            <div
              key={`${section.id}-stat-${i}`}
              className="rounded-xl border border-border bg-card/50 p-5"
            >
              <div className="mb-1 flex items-center gap-2">
                <BarChart3
                  className="h-4 w-4 text-primary"
                  aria-hidden="true"
                />
                <span className="text-2xl font-bold text-primary">
                  {stat.value}
                </span>
              </div>
              <p className="mb-1 text-sm font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Case Studies */}
      {section.caseStudies && (
        <div className="mt-8 flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-foreground">
            Real-World Results
          </h3>
          {section.caseStudies.map((cs, i) => (
            <article
              key={`${section.id}-case-${i}`}
              className="rounded-xl border border-border bg-card/50 p-6"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {cs.industry}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <span className="font-semibold text-foreground">
                    Challenge:{" "}
                  </span>
                  <span className="text-muted-foreground">{cs.problem}</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    Solution:{" "}
                  </span>
                  <span className="text-muted-foreground">{cs.solution}</span>
                </div>
                <div className="rounded-lg border border-green-500/10 bg-green-500/5 px-4 py-2">
                  <span className="font-semibold text-green-400">
                    Result:{" "}
                  </span>
                  <span className="text-muted-foreground">{cs.result}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Feature Cards */}
      {section.type === "features" && section.features && (
        <div className="mt-2 flex flex-col gap-4">
          {section.features.map((feat, i) => {
            const IconComponent =
              feat.icon && iconMap[feat.icon]
                ? iconMap[feat.icon]
                : <Lightbulb className="h-5 w-5" />
            return (
              <div
                key={`${section.id}-feature-${i}`}
                className="flex gap-4 rounded-xl border border-border bg-card/50 p-5"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  {IconComponent}
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-foreground">
                    {feat.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Code Block */}
      {section.type === "code" && section.code && (
        <div className="mt-2 overflow-hidden rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-card/80 px-4 py-2">
            <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-muted-foreground">
              {section.code.language}
            </span>
          </div>
          <div className="overflow-x-auto bg-neutral-900 p-4">
            <pre className="text-xs leading-relaxed text-muted-foreground">
              <code className={`language-${section.code.language}`}>
                {section.code.code}
              </code>
            </pre>
          </div>
          <div className="border-t border-border bg-card/80 px-4 py-2">
            <p className="text-xs text-muted-foreground">
              {section.code.caption}
            </p>
          </div>
        </div>
      )}

      {/* Checklist */}
      {section.type === "checklist" && section.checklist && (
        <div className="mt-2 flex flex-col gap-3">
          {section.checklist.map((item, i) => (
            <div
              key={`${section.id}-check-${i}`}
              className="flex gap-3 rounded-xl border border-border bg-card/50 p-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-green-400"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Stats */}
      {section.type === "pricing" && section.stats && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {section.stats.map((stat, i) => (
            <div
              key={`${section.id}-price-${i}`}
              className="rounded-xl border border-primary/20 bg-primary/5 p-5"
            >
              <span className="text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  )
}

/* ─── Fallback Article ─── */
function FallbackArticle({ post }: { post: (typeof blogPosts)[number] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="flex flex-col gap-12"
    >
      <motion.section variants={fadeInUp}>
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Overview
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          At PixoraNest, we build powerful AI automation solutions that help
          Indian startups and small businesses streamline operations, reduce
          manual work, and deliver exceptional customer experiences across
          WhatsApp, calls, and social media.
        </p>
      </motion.section>

      <motion.section variants={fadeInUp}>
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          The Challenge
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Modern businesses in India face increasing pressure to respond faster,
          operate efficiently, and deliver personalized experiences to customers.
          Manual processes create bottlenecks that slow down operations and
          reduce customer satisfaction. Without intelligent AI automation,
          businesses struggle to scale communication and maintain consistent
          service quality.
        </p>
      </motion.section>

      <motion.section variants={fadeInUp}>
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Our Approach
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          PixoraNest develops AI-powered automation systems designed to integrate
          seamlessly into business workflows. Our technology handles repetitive
          tasks, automates customer communication on WhatsApp and calls, and
          generates insights from every interaction to improve operational
          performance.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Instant Response",
              desc: "AI-powered systems respond to customer inquiries in under 30 seconds, 24 hours a day.",
            },
            {
              title: "Smart Routing",
              desc: "Intelligent automation routes inquiries to the correct department or automated workflow.",
            },
            {
              title: "Data-Driven Insights",
              desc: "Every customer interaction generates valuable data that improves performance over time.",
            },
            {
              title: "Seamless Integration",
              desc: "PixoraNest solutions connect easily with CRM systems, calendars, and existing tools.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card/50 p-5"
            >
              <h4 className="mb-1 text-sm font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeInUp}>
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Results & Impact
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Businesses implementing PixoraNest AI automation platforms report
          significant improvements in efficiency, customer engagement, and
          revenue growth. Companies adopting AI automation solutions typically
          see measurable results within the first 30 days of deployment.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { value: "60%", label: "Faster Response Times" },
            { value: "3x", label: "Lead Conversion Increase" },
            { value: "70%", label: "Operational Cost Reduction" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center"
            >
              <span className="text-2xl font-bold text-primary">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeInUp}>
        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Getting Started
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Ready to transform your business operations using AI automation?
          PixoraNest helps organizations identify the most impactful automation
          opportunities and implement intelligent systems that deliver measurable
          results.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Explore our{" "}
          <Link
            href="/solutions"
            className="text-primary font-medium hover:underline"
          >
            AI automation solutions
          </Link>{" "}
          or{" "}
          <Link
            href="/contact"
            className="text-primary font-medium hover:underline"
          >
            contact our automation experts
          </Link>{" "}
          to schedule a personalized demo.
        </p>
      </motion.section>
    </motion.div>
  )
}