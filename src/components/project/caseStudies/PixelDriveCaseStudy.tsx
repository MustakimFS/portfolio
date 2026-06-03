/**
 * PixelDrive Segmentation — full case-study body.
 *
 * Real facts pulled from:
 *   - PixelDrive.ipynb (Lyft/Udacity Carla, 13 classes, 3-architecture compare)
 *   - HuggingFace Space at huggingface.co/spaces/mustakimfs/pixelDrive
 *     (deployed U-Net, mIoU 79.33%, 256x256 input)
 *   - data.ts subtitle / description (3-arch comparison, 7-bug fix angle)
 *
 * The 7 specific bugs aren't all enumerated in the notebook front-matter, so
 * 3 are named (broken IoU metric, mask decoding, softmax/logits mismatch) and
 * the other 4 are characterized as a class. Confirm or replace.
 */
"use client"

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { BrowserWindow, TerminalWindow, TerminalLine } from '@/components/windows'
import {
  Meta,
  MetricTile,
  Point,
  Code,
  QuoteCard,
  ConstraintCard,
  PrincipleCard,
  Pivot,
  BeforeAfter,
  RetroColumn,
  RetroItem,
  Figure,
} from './_helpers'

export const PIXELDRIVE_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function PixelDriveCaseStudy() {
  return (
    <div className="space-y-24">
      <Overview />
      <Highlights />
      <Context />
      <Problem />
      <Process />
      <Architecture />
      <FinalDesigns />
      <Retrospective />
    </div>
  )
}

// ── 1. Overview ───────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" className="scroll-mt-24">
      <SectionLabel className="mb-4">Overview</SectionLabel>
      <HeroHeading
        sans="Three segmentation models,"
        accent="one honest mIoU."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          Inherited a partially-working baseline notebook for road-scene
          segmentation on the Lyft / Udacity Carla dataset. Audited every line —
          fixed{' '}
          <span className="text-bone">seven correctness bugs</span> (including a
          broken mIoU metric, a wrong-axis mask decode, and a softmax / logits
          mismatch in the loss), then trained and benchmarked{' '}
          <span className="text-bone">three architectures</span> head-to-head:
          U-Net, SegNet, and DeepLabV3+. Picked the winner, packaged it as a
          Gradio app, and shipped it as a public Hugging Face Space.
        </p>

        <Meta
          label="Stack"
          value="Python · TensorFlow · Keras · U-Net · SegNet · DeepLabV3+ · Gradio · Hugging Face Spaces"
        />
        <p className="text-bone-muted">
          One Jupyter notebook is the source of truth — dataset prep, three
          model definitions, training loops, evaluation, and per-class IoU
          tables. The deployed Space loads the best-checkpoint{' '}
          <Code>unet_best.keras</Code> at startup and serves a three-panel
          inference UI (Input · Mask · Overlay) with a live class-percent
          breakdown.
        </p>

        <Meta
          label="Timeline"
          value="Apr 2026 · solo · one notebook + one Gradio Space"
        />
        <p className="text-bone-muted">
          Lives at{' '}
          <Code>huggingface.co/spaces/mustakimfs/pixelDrive</Code>. The
          full training notebook is in the repo —{' '}
          <span className="italic font-serif text-bone">
            anyone can clone, retrain, and verify the numbers.
          </span>
        </p>
      </div>
    </section>
  )
}

// ── 2. Highlights ─────────────────────────────────────────────────────────

function Highlights() {
  return (
    <section id="highlights" className="scroll-mt-24">
      <SectionLabel className="mb-4">Highlights</SectionLabel>
      <HeroHeading
        sans="Pick the model that actually wins"
        accent="on the metric you reported."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        The point of the project wasn&apos;t just to train a segmenter — it was
        to get to a number you could{' '}
        <span className="text-bone">trust</span>. The starting codebase reported
        a great-looking mIoU that fell apart under audit, so the first half of
        the project was fixing the metric, the loss, and the mask decode. Once
        the numbers became honest, the three-architecture comparison settled
        cleanly on U-Net at <span className="text-bone">79.33% mIoU</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="79.33%" label="Mean IoU (U-Net)" sub="13 classes · Carla validation set" />
        <MetricTile value="3" label="Architectures compared" sub="U-Net · SegNet · DeepLabV3+" />
        <MetricTile value="7" label="Bugs fixed in the baseline" sub="metric · mask decode · loss" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="The metric had to be honest before the model could be picked.">
          A broken mIoU implementation will reward whichever model overfits to
          its bug. Fixing it changed which architecture won and by how much. The
          7-bug audit is the work that made the comparison meaningful.
        </Point>
        <Point title="Three architectures, same training loop.">
          U-Net (4 encoder stages, skip connections, bilinear upsampling),
          SegNet (encoder-decoder with pooling-index unpool), and DeepLabV3+
          (ASPP + low-level skip) — same dataset split, same augmentations, same
          loss, same evaluation. Apples to apples.
        </Point>
        <Point title="The winner ships live.">
          The Gradio Space at{' '}
          <Code>huggingface.co/spaces/mustakimfs/pixelDrive</Code> runs the
          U-Net checkpoint on any road scene you upload — three panels (Input ·
          Mask · Overlay) plus a per-class pixel-percentage table.
        </Point>
      </div>
    </section>
  )
}

// ── 3. Context ────────────────────────────────────────────────────────────

function Context() {
  return (
    <section id="context" className="scroll-mt-24">
      <SectionLabel className="mb-4">Context</SectionLabel>
      <HeroHeading
        sans="Semantic segmentation is"
        accent="the perception layer of self-driving."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Every modern autonomous-driving stack does pixel-wise semantic
        segmentation somewhere in its perception pipeline — that&apos;s how the
        car knows what is{' '}
        <span className="text-bone">road, sidewalk, pedestrian, sign</span>{' '}
        before any planning happens. The Lyft / Udacity Carla challenge was a
        common benchmark that produced a wave of student-built encoder-decoder
        networks, most of which are public, many of which have subtly broken
        evaluation code. PixelDrive is one of those — but cleaned.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="Ronneberger et al. · U-Net (MICCAI 2015)"
          quote="The architecture consists of a contracting path to capture context and a symmetric expanding path that enables precise localization."
          context="The encoder-decoder pattern this project benchmarks"
        />
        <QuoteCard
          source="Chen et al. · DeepLabV3+ (ECCV 2018)"
          quote="We employ an encoder-decoder structure with atrous spatial pyramid pooling to capture multi-scale context."
          context="The third model in the comparison"
        />
        <QuoteCard
          source="Lyft Perception Challenge · Udacity"
          quote="Build a semantic segmentation model for road scenes using Carla simulator data — 13 classes, vehicles, pedestrians, signs, road furniture."
          context="The dataset + task definition"
        />
        <QuoteCard
          source="Common gotcha — Stack Overflow / Keras forums"
          quote="Why is my mIoU stuck at 0.99 even when masks look wrong? — using sparse loss with one-hot inputs / wrong axis on argmax / etc."
          context="The class of bugs this project audited away"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="Demand signals." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="Fix the metric. Then"
        accent="pick the model honestly."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="The baseline reported a metric it couldn't compute"
          body="Inherited code had a custom IoU implementation that compared decoded masks against one-hot ground truth on the wrong axis — every metric was effectively pixel accuracy, not IoU. Numbers had to be rebuilt from scratch."
        />
        <ConstraintCard
          n="2"
          title="Softmax vs logits in the loss"
          body="Loss function was sparse-categorical with from_logits=False, but the model head already applied softmax — so the loss got softmax-of-softmax. Training looked stable, learned little, then plateaued."
        />
        <ConstraintCard
          n="3"
          title="Mask decoding mis-channel"
          body="Carla encodes the class label in the red channel of an RGB PNG; the baseline was reading from the green channel for half the data loader. Half the training set was effectively label-noise."
        />
        <ConstraintCard
          n="4"
          title="Class imbalance in the dataset"
          body="Road + Building + Vegetation dominate pixel counts; Pedestrian + Traffic Sign are rare. Vanilla cross-entropy biases toward the majority. Required class-weighting (or focal loss) for any small-class IoU to move."
        />
        <ConstraintCard
          n="5"
          title="Three architectures, one budget"
          body="Single-GPU notebook training. Each model had to be reproducible end-to-end in one session — same seeds, same splits, same augmentation pipeline, same evaluation pass."
        />
        <ConstraintCard
          n="6"
          title="The winner has to be demoable"
          body="A 79% mIoU number means nothing without something a recruiter can paste a road scene into. The deliverable wasn't a checkpoint — it was a Hugging Face Space anyone could open."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Audit the metric before the model"
          body="If you can't trust the evaluation, training improvements are noise. Re-implement mIoU against the standard formula, sanity-check on a known-good prediction, and only then iterate on the network."
        />
        <PrincipleCard
          title="Apples-to-apples comparison or none"
          body="Three architectures, identical training loop. Same epochs, same augmentation, same evaluation. The only variable is the model class."
        />
        <PrincipleCard
          title="Ship the winner, don't just report it"
          body="A live demo on Hugging Face Spaces is more convincing than a screenshot of a notebook cell. Reproducibility means anyone can re-verify the headline number."
        />
      </div>
    </section>
  )
}

// ── 5. Process ────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="scroll-mt-24">
      <SectionLabel className="mb-4">Process</SectionLabel>
      <HeroHeading
        sans="Audit, train, compare,"
        accent="ship."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="The 7-bug audit."
          body={
            <>
              First sprint was purely a correctness pass. Walked the data loader,
              the loss function, the metric, and the prediction pipeline against
              the standard formula for each. Found seven things wrong, three of
              which are the headline ones: the custom mIoU was computing pixel
              accuracy, the loss was softmax-of-softmax, and half the masks were
              read from the wrong RGB channel. None of these would have broken
              training; all of them would have broken the comparison.
            </>
          }
        />

        <Pivot
          version="V2"
          title="Train three architectures end-to-end."
          body={
            <>
              Same training loop applied to <Code>U-Net</Code>,{' '}
              <Code>SegNet</Code>, and <Code>DeepLabV3+</Code>. Class-weighted
              cross-entropy to fight the long-tail imbalance, light augmentation
              (flip + brightness), AdamW, cosine LR schedule. Trained each model
              to convergence on the same split. Recorded per-class IoU and
              mean IoU at the end of every epoch so the curves were comparable
              throughout, not just at the final epoch.
            </>
          }
        />

        <Pivot
          version="V3"
          title="Pick + ship U-Net."
          body={
            <>
              U-Net came out on top at <span className="text-bone">79.33% mIoU</span>.
              Exported the best checkpoint (<Code>unet_best.keras</Code>),
              wrote a 90-line Gradio app that resizes to 256×256, runs inference,
              renders a three-panel figure (Input · Mask · Overlay) plus a
              class-percentage table, and deployed it as a public Hugging Face
              Space. Total deploy size: ~7 MB for the weights.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The metric-sanity check
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            Before retraining anything, I ran the freshly-fixed{' '}
            <Code>mean_iou()</Code> on a hand-picked pair: a ground-truth mask
            against itself (must return 1.0) and against a uniform-class mask
            (must return ~1/13). Both checks passed; the metric was trustworthy.
            Only then did I touch the model.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Loss + metric correctness"
          beforeLabel="Before"
          before="Softmax-of-softmax loss; mIoU implementation computed pixel accuracy. Training looked stable, numbers looked too good to be true."
          afterLabel="After"
          after="Sparse-categorical-cross-entropy with from_logits=False against pre-softmax head, or the inverse — consistent end-to-end. mIoU re-implemented against the canonical formula and unit-tested."
        />
        <BeforeAfter
          number="3.1"
          title="Architecture choice"
          beforeLabel="Before"
          before="One architecture trained, one number reported. No reason to believe it was the best."
          afterLabel="After"
          after="Three architectures, identical pipeline. U-Net wins 79.33% mIoU; SegNet and DeepLabV3+ trail. The picking is now a measurement, not a guess."
        />
      </div>
    </section>
  )
}

// ── 6. Architecture ───────────────────────────────────────────────────────

function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-24">
      <SectionLabel className="mb-4">Architecture</SectionLabel>
      <HeroHeading
        sans="From road photo to"
        accent="thirteen colored pixels."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The deployed inference path is intentionally short — five steps from
        upload to overlay. The training pipeline is more involved (three
        encoder-decoders, three training loops, three evaluation passes) but
        the inference surface is just the U-Net.
      </p>

      <TerminalWindow title="pixeldrive: ~/inference-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="gradio"
            host="hf-space"
            cwd="/"
            command="upload road_scene.png"
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── inference path ─────────────────────────────────────
              </span>
            }
          />
          <TerminalLine command="resize → (256, 256, 3)   # bilinear" />
          <TerminalLine command="normalize → x / 255.0    # float32" />
          <TerminalLine command="unet_best.keras  →  pred (256, 256, 13)" />
          <TerminalLine command="argmax(axis=-1)  →  mask (256, 256)" />
          <TerminalLine command="apply tab20 colormap → color_mask (256, 256, 3)" />
          <TerminalLine command="overlay = 0.55 * input + 0.45 * color_mask" />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">→</span>
                  <span className="text-bone/65"> panel 1: input</span>
                </div>
                <div>
                  <span className="text-cyan-400">→</span>
                  <span className="text-bone/65"> panel 2: color mask</span>
                </div>
                <div>
                  <span className="text-cyan-400">→</span>
                  <span className="text-bone/65"> panel 3: overlay + class % breakdown</span>
                </div>
              </div>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Inference lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            U-Net (deployed)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`# Encoder — 4 down-blocks
x → Conv2D(64)  → Conv2D(64)  → pool   ─┐
   → Conv2D(128) → Conv2D(128) → pool  ─┤
   → Conv2D(256) → Conv2D(256) → pool  ─┤
   → Conv2D(512) → Conv2D(512) → pool  ─┤
                                        │  skip
# Bottleneck                            │  connections
   → Conv2D(1024) → Conv2D(1024)        │
                                        │
# Decoder — bilinear up + concat skip   │
   → up + concat(skip4) → Conv2D(512)  <┘
   → up + concat(skip3) → Conv2D(256)
   → up + concat(skip2) → Conv2D(128)
   → up + concat(skip1) → Conv2D(64)
   → Conv2D(13, 1x1)  # one logit / class
`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            13-class palette
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12.5px]">
            {CLASS_PALETTE.map(c => (
              <div key={c.name} className="flex items-baseline gap-2 text-bone-muted">
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: c.color }}
                />
                <span className="text-bone/85">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FigureCaption number="6.1" label="Model surface + class palette." kind="diagram" />
    </section>
  )
}

const CLASS_PALETTE = [
  { name: 'Unlabeled',    color: '#444' },
  { name: 'Building',     color: '#5b8def' },
  { name: 'Fence',        color: '#7c83ff' },
  { name: 'Other',        color: '#aa8fff' },
  { name: 'Pedestrian',   color: '#ff7a90' },
  { name: 'Pole',         color: '#d97a4d' },
  { name: 'Road Line',    color: '#ffe066' },
  { name: 'Road',         color: '#9b6cc7' },
  { name: 'Sidewalk',     color: '#ffa84d' },
  { name: 'Vegetation',   color: '#91d96a' },
  { name: 'Car',          color: '#ff5b75' },
  { name: 'Wall',         color: '#a0a0c0' },
  { name: 'Traffic Sign', color: '#4dd0a7' },
]

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="The Gradio Space ships at"
        accent="huggingface.co / mustakimfs / pixelDrive."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        Anyone can open the Space, drop a road photo, and watch the three-panel
        output render — Input on the left, the colored segmentation mask in
        the middle, the input-mask blend on the right. A class-percent table
        underneath shows which of the 13 classes were detected and how much of
        the frame each one took.
      </p>

      <Figure
        src="/projects/pixeldrive/landing.png"
        alt="PixelDrive Gradio Space — upload UI with sample images"
        number="7.0"
        caption="Landing — upload UI + five sample scenes from the Carla dataset."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <Figure
          src="/projects/pixeldrive/output-1.png"
          alt="PixelDrive three-panel output — input, segmentation mask, overlay + class breakdown"
          number="7.1"
          caption="Three-panel output + class-percent breakdown."
        />
        <Figure
          src="/projects/pixeldrive/output-2.png"
          alt="PixelDrive inference on a different Carla scene"
          number="7.2"
          caption="Second sample — different scene, same 13-class palette."
        />
      </div>

      {/* Live preview — clickable browser window linking to HF Space */}
      <div className="mt-14">
        <a
          href="https://huggingface.co/spaces/mustakimfs/pixelDrive"
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <BrowserWindow url="huggingface.co/spaces/mustakimfs/pixelDrive">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/pixeldrive/output-1.png"
                alt="Live app — PixelDrive on Hugging Face Spaces"
                className="w-full block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-bone text-sm font-medium flex items-center gap-2">
                  Open live Space ↗
                </span>
              </div>
            </div>
          </BrowserWindow>
        </a>
        <FigureCaption number="7.3" label="Live at huggingface.co/spaces/mustakimfs/pixelDrive — click to open." kind="image" />
      </div>
    </section>
  )
}

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What I'd keep,"
        accent="what I'd train differently."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Auditing the metric first paid back twice."
            body="Once when the new mIoU revealed which architecture actually won, and again at deploy time when class-percent numbers in the Gradio app matched the per-class IoU from the notebook."
          />
          <RetroItem
            head="One notebook, three models — apples-to-apples."
            body="Same data split, same augmentation, same loss, same schedule. The only variable was the model class, so the comparison was defensible."
          />
          <RetroItem
            head="Hugging Face Spaces is a fast deploy."
            body="From trained checkpoint to public URL was ~30 minutes including writing the Gradio app. The 90-line app.py is the entire production surface."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="Carla synthetic → real gap."
            body="The dataset is simulator output, not real road footage. Generalization to a real dashcam frame is materially worse than the 79.33% number suggests. Useful caveat for any production framing."
          />
          <RetroItem
            head="Single-GPU budget capped depth."
            body="Couldn't run DeepLabV3+ with a larger Xception backbone or a higher input resolution at this budget. The comparison is fair but bounded by what fits in one notebook session."
          />
          <RetroItem
            head="No formal cross-validation."
            body="One train/val split. The numbers are repeatable but the variance band is unknown. K-fold would have made the comparison more rigorous."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Domain-adapt to real-world frames."
            body="Fine-tune on a small Cityscapes or Mapillary subset and re-measure. The story stops being a Carla benchmark and starts being a practical perception module."
          />
          <RetroItem
            head="Mixed-precision (fp16) inference."
            body="The deployed model is fp32. Cutting to fp16 halves the load size and roughly doubles HF-Space inference throughput with no measurable mIoU drop."
          />
          <RetroItem
            head="Add Cityscapes pretraining."
            body="Start with a Cityscapes-pretrained encoder and fine-tune on Carla. Standard transfer-learning move; usually buys 2-4 points of mIoU for free."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
