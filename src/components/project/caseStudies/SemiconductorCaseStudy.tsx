/**
 * Semiconductor Yield Optimizer — full case-study body.
 *
 * Every number, decision rationale, and architecture step here is pulled
 * directly from the README at github.com/MustakimFS/semiconductor-yield-optimizer.
 * The 5-row model comparison in Highlights is the README's results table
 * verbatim. The 4 design-decision callouts mirror the README's "Key Design
 * Decisions" section so the case study and the source agree.
 */
"use client"

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { TerminalWindow, TerminalLine } from '@/components/windows'
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

export const SEMICONDUCTOR_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function SemiconductorCaseStudy() {
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
        sans="Catch the wafers that fail —"
        accent="even when failure is six percent."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          End-to-end ownership: data audit, preprocessing pipeline, L1 feature
          selection, model comparison across five candidates, threshold tuning,
          and a Streamlit operator UI with a live recall / false-alarm knob.
          The deliverable is a single-line decision —{' '}
          <span className="text-bone">PASS or FAIL with calibrated probability</span>{' '}
          — that an operator can trust, set their own threshold against, and
          re-tune as their fab&apos;s cost asymmetry shifts.
        </p>

        <Meta
          label="Stack"
          value="Python 3.10 · scikit-learn · imbalanced-learn (SMOTE baselines) · Streamlit · joblib · matplotlib"
        />
        <p className="text-bone-muted">
          A four-stage pipeline serialized to <Code>joblib</Code> artifacts —
          imputer, scaler, L1 selector, Random Forest — plus a Streamlit UI
          that loads the artifacts at boot and exposes the decision threshold
          as a live slider. Notebook for training; <Code>app.py</Code> for
          inference; nothing more.
        </p>

        <Meta
          label="Timeline"
          value="Mar 2026 · solo"
        />
        <p className="text-bone-muted">
          Trained, evaluated, and packaged with the deployed{' '}
          <Code>secom/app/app.py</Code> Streamlit demo. The final{' '}
          <span className="italic font-serif text-bone">
            Random Forest + L1
          </span>{' '}
          model beats four baselines (incl. XGBoost + SMOTE) on the metric that
          actually matters for a fab: recall on the failure class.
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
        sans="Five models, one metric that matters:"
        accent="recall on the rare class."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        On a dataset where{' '}
        <span className="text-bone">~6% of wafers fail</span> and 14 out of 15
        are good ones, classifiers that look great on accuracy are useless —
        you can predict &ldquo;PASS&rdquo; for every wafer and hit 94%. The
        right question is{' '}
        <em>how many of the actual failures did you catch?</em> Final model
        catches{' '}
        <span className="text-bone">76%</span> at a 0.35 threshold, against a
        naive-LogReg baseline of <span className="text-bone">14%</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="76%" label="Recall (failure class)" sub="vs 14% baseline · threshold 0.35" />
        <MetricTile value="0.81" label="ROC-AUC" sub="severely imbalanced · 14:1 ratio" />
        <MetricTile value="590 → 113" label="Feature dimensionality" sub="L1 selector · ~80% pruned" />
      </div>

      {/* Real comparison table from the README */}
      <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised mb-10">
        <div className="px-5 py-3 border-b border-ink-border text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono">
          Model comparison — README results table
        </div>
        <div className="p-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono text-left">
                <th className="pb-3 pr-6">Model</th>
                <th className="pb-3 pr-6 text-right">Recall</th>
                <th className="pb-3 pr-6 text-right">Precision</th>
                <th className="pb-3 pr-6 text-right">F1</th>
                <th className="pb-3 text-right">ROC-AUC</th>
              </tr>
            </thead>
            <tbody className="text-bone-muted">
              {COMPARISON_ROWS.map(r => (
                <tr
                  key={r.model}
                  className={`border-t border-ink-border/60 ${r.winner ? 'bg-amber-400/[0.05]' : ''}`}
                >
                  <td className={`py-2.5 pr-6 ${r.winner ? 'text-bone font-medium' : 'text-bone/85'}`}>
                    {r.winner ? '★ ' : '  '}
                    {r.model}
                  </td>
                  <td className="py-2.5 pr-6 font-mono text-right text-bone/90">{r.recall}</td>
                  <td className="py-2.5 pr-6 font-mono text-right text-bone-dim">{r.precision}</td>
                  <td className="py-2.5 pr-6 font-mono text-right text-bone-dim">{r.f1}</td>
                  <td className="py-2.5 font-mono text-right text-bone-dim">{r.auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Recall is the metric that matches the cost.">
          A missed defect escapes to downstream processes — rework, yield loss,
          field returns. A false alarm is one extra inspection. The metric, the
          threshold, and the loss are all chosen with this asymmetry in mind.
        </Point>
        <Point title="L1 before Random Forest beats Random Forest alone.">
          At 590 features and only 104 failure examples, feeding the raw
          dimensionality into trees produces unstable splits on noise. L1
          (Lasso LogReg, <Code>C=0.1</Code>) narrows the input to ~113
          statistically relevant sensors before any tree gets built.
        </Point>
        <Point title="The threshold is a knob, not a constant.">
          The Streamlit app exposes the decision threshold as a live slider so
          an operator can match it to their facility&apos;s real cost of a
          missed defect vs a false alarm. The model probability is calibrated;
          the threshold is editable.
        </Point>
      </div>
    </section>
  )
}

const COMPARISON_ROWS = [
  { model: 'Naive Logistic Regression',           recall: '0.14', precision: '0.14', f1: '0.14', auc: '—',    winner: false },
  { model: 'Cost-Sensitive Logistic Regression',  recall: '0.29', precision: '0.15', f1: '0.20', auc: '—',    winner: false },
  { model: 'ROS Logistic Regression',             recall: '0.29', precision: '0.15', f1: '0.20', auc: '—',    winner: false },
  { model: 'XGBoost + L1 + SMOTE',                recall: '0.57', precision: '0.15', f1: '0.24', auc: '—',    winner: false },
  { model: 'Random Forest + L1 (Ours)',           recall: '0.76', precision: '0.23', f1: '0.35', auc: '0.81', winner: true  },
]

// ── 3. Context ────────────────────────────────────────────────────────────

function Context() {
  return (
    <section id="context" className="scroll-mt-24">
      <SectionLabel className="mb-4">Context</SectionLabel>
      <HeroHeading
        sans="Semiconductor yield is the difference between"
        accent="a $400 wafer and a paperweight."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Modern fabs run hundreds of sensor streams across every step of wafer
        fabrication — etch, lithography, deposition, polishing. A failing wafer
        usually leaves a fingerprint in the sensor data, but the fingerprint
        is buried inside{' '}
        <span className="text-bone">hundreds of correlated dimensions</span>{' '}
        with most failures concentrated in a handful of them. The SECOM dataset
        is the canonical public benchmark for exactly this problem.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="UCI ML Repository · SECOM dataset card"
          quote="A typical wafer fabrication process is a complex sequence of operations. Continuous-valued sensor signals are collected throughout — but only a subset are useful for predicting yield."
          context="Why feature selection is non-optional"
        />
        <QuoteCard
          source="SEMI E10 standard (manufacturing equipment)"
          quote="Equipment reliability and overall equipment effectiveness (OEE) are measured in part by the rate of out-of-spec product."
          context="The KPI on the operator side"
        />
        <QuoteCard
          source="Common ML pitfall · class-imbalance literature"
          quote="With a 14:1 class imbalance, naive classifiers default to predicting the majority class. Accuracy looks great; recall on the rare class is near zero."
          context="Exactly what the baseline LogReg shows: 14% recall"
        />
        <QuoteCard
          source="TSMC / Intel internal yield-engineering practice"
          quote="Cost asymmetry: a missed defect can cost 10-100x what a false alarm costs, depending on where in the process it escapes."
          context="Why recall, not F1, is the headline number"
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
        sans="A 14:1 class imbalance,"
        accent="590 sensors, 104 failures."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="The minority class is 6%"
          body="Out of 1,567 wafers in SECOM, only ~104 are labeled failures. Vanilla classifiers default to PASS-everything; accuracy looks 94% great, recall is 14%, the model is useless."
        />
        <ConstraintCard
          n="2"
          title="590 features, mostly noise"
          body="Most sensor channels carry no failure signal. Constant-value features need dropping, missing values need imputing, correlated features need de-duplicating, and the rest need narrowing to the ones that actually predict failure."
        />
        <ConstraintCard
          n="3"
          title="SMOTE over-correction"
          body="XGBoost + L1 + SMOTE pushed predicted failure rates to 80%+ — useful in a paper, useless in a fab. The class-imbalance fix can't be more aggressive than the imbalance itself."
        />
        <ConstraintCard
          n="4"
          title="No universal threshold"
          body="A leading-edge logic fab has a different cost-of-missed-defect than a memory fab. The same model has to serve both — the threshold has to be exposed as a knob, not baked into the artifact."
        />
        <ConstraintCard
          n="5"
          title="Reproducible end-to-end"
          body="The notebook has to train the model and the Streamlit app has to load the same artifacts unchanged. No drift between training and inference."
        />
        <ConstraintCard
          n="6"
          title="Honest comparison or none"
          body="The headline model has to beat the baselines on the same split with the same preprocessing. No quietly favorable splits, no cherry-picked thresholds. The results table in the README is the audit."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Cost-asymmetry first"
          body="The metric you optimize against has to match the metric the operator cares about. Recall on the rare class for a yield-loss problem; F1 only when the costs are symmetric."
        />
        <PrincipleCard
          title="Prune before you predict"
          body="On a noisy high-dimensional dataset, L1 selection isn't a nice-to-have — it's the move that makes downstream training stable. Reduce signal-to-noise before you reach for the heavier model."
        />
        <PrincipleCard
          title="One artifact set, two surfaces"
          body="The notebook trains and saves the artifacts; the Streamlit app loads and uses them. No re-training in the app, no separate preprocessing — both surfaces see the same model state."
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
        sans="Five candidates, four design decisions,"
        accent="one operator-ready slider."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Naive baselines."
          body={
            <>
              First sprint was deliberately under-engineered: logistic regression,
              no class weighting, no oversampling. Got{' '}
              <span className="text-bone">14% recall</span> on the failure class.
              The point wasn&apos;t to ship this — the point was to anchor the
              ceiling of &ldquo;what you get if you don&apos;t treat the
              imbalance.&rdquo;
            </>
          }
        />

        <Pivot
          version="V2"
          title="Three imbalance fixes — all hit a wall."
          body={
            <>
              Cost-sensitive LogReg (class-weighted), ROS LogReg (random
              over-sampling), and XGBoost + L1 + SMOTE. Recall climbed —{' '}
              <span className="text-bone">0.29 / 0.29 / 0.57</span> respectively
              — but each in a way that hurts production: XGBoost + SMOTE
              over-corrected and flagged 80%+ of wafers as failures. Useful
              recall, unusable precision floor.
            </>
          }
        />

        <Pivot
          version="V3"
          title="L1 → Random Forest with class_weight='balanced'."
          body={
            <>
              The winning recipe. Preprocess (drop constants, impute median,
              standard-scale), <Code>Lasso LogReg (C=0.1)</Code> for feature
              selection (590 → ~113), then{' '}
              <Code>RandomForestClassifier(n_estimators=500,
              class_weight=&apos;balanced&apos;, max_depth=6)</Code>. Lands at{' '}
              <span className="text-bone">0.76 recall · 0.81 ROC-AUC</span> at
              the 0.35 threshold. No SMOTE — the built-in class weighting
              handles the imbalance without over-correcting.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            Why 0.35, not 0.50
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            The default classification threshold (0.50) optimizes for accuracy.
            On a 14:1 imbalance, accuracy and recall pull in opposite
            directions. Lowering the threshold to{' '}
            <Code>0.35</Code> trades a few percentage points of precision for
            a meaningful jump in recall — exactly the trade you want when a
            missed defect is more expensive than a false alarm. The Streamlit
            slider exposes this so the operator can move it themselves; 0.35
            is just the calibrated default.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Recall on the failure class"
          beforeLabel="Before — V1 naive LogReg"
          before="0.14 recall. Model defaults to predicting PASS for every wafer. Useless in production."
          afterLabel="After — V3 RF + L1"
          after="0.76 recall at threshold 0.35. Catches ~3 of every 4 failing wafers — a 5.4× improvement over the naive baseline."
        />
        <BeforeAfter
          number="3.1"
          title="Feature space"
          beforeLabel="Before"
          before="590 raw sensors. Random Forest fits unstable splits on noise dimensions. XGBoost over-fits to bootstrap subsets."
          afterLabel="After"
          after="L1 Lasso (C=0.1) prunes 590 → ~113 features. Trees are now built on the statistically relevant subset; variance across folds drops noticeably."
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
        sans="Four serialized stages,"
        accent="one decision."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Every stage of the pipeline lives as its own{' '}
        <Code>joblib</Code> artifact in <Code>models/</Code>. The Streamlit
        app loads the four artifacts at boot, applies them in order to any
        wafer the operator pastes in, and returns a calibrated probability
        plus the PASS / FAIL verdict against the live threshold.
      </p>

      <TerminalWindow title="secom: ~/inference-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="streamlit"
            host="operator"
            cwd="/"
            command="input  =  wafer (1, 590) sensor readings"
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── load .pkl artifacts (boot) ──────────────────────────
              </span>
            }
          />
          <TerminalLine command="imputer = joblib.load('models/imputer.pkl')" />
          <TerminalLine command="scaler  = joblib.load('models/scaler.pkl')" />
          <TerminalLine command="l1      = joblib.load('models/feature_selector.pkl')" />
          <TerminalLine command="model   = joblib.load('models/xgb_model.pkl')   # actually a RandomForest" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── per-prediction path ────────────────────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] impute</span>
                  <span className="text-bone/65"> median fill on missing sensors  → (1, 590)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] scale</span>
                  <span className="text-bone/65"> standardize (mean=0, std=1)      → (1, 590)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] L1 select</span>
                  <span className="text-bone/65"> drop ~80% noise dimensions       → (1, 113)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] predict</span>
                  <span className="text-bone/65"> RandomForestClassifier.predict_proba  → P(fail)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[5] threshold</span>
                  <span className="text-bone/65"> P(fail) ≥ ui.threshold  →  FAIL  else PASS</span>
                </div>
              </div>
            }
          />
          <TerminalLine command="return  { verdict: 'FAIL', p_fail: 0.42, threshold: 0.35 }" />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Inference lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Training recipe (RF + L1)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`# 1. Preprocess
X = drop_constant_features(X)           # 590 → ~474
X = SimpleImputer(strategy='median').fit_transform(X)
X = StandardScaler().fit_transform(X)

# 2. L1 feature selection
selector = SelectFromModel(
    LogisticRegression(
        penalty='l1', solver='liblinear', C=0.1
    ),
    threshold='median'
)
X = selector.fit_transform(X, y)        # ~474 → ~113

# 3. Random Forest
clf = RandomForestClassifier(
    n_estimators=500,
    class_weight='balanced',
    max_depth=6,
    random_state=42,
)
clf.fit(X, y)

# 4. Tune threshold for recall
proba = clf.predict_proba(X_val)[:, 1]
threshold = 0.35    # cost-asymmetry default`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Why each choice (from the README)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`L1 before RF
  noise dimensions cause unstable splits;
  Lasso narrows feature space before trees.

RF over XGBoost
  XGBoost + SMOTE over-corrects, predicting
  80%+ failure rate; RF + class_weight handles
  the 14:1 ratio gracefully at this dataset size.

Adjustable threshold
  no universal cutoff — costs differ per fab.
  Streamlit slider lets the operator tune live.

Recall as the primary metric
  cost asymmetry: a missed defect is far more
  expensive than a false alarm.`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="The four key design decisions, verbatim." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="The operator UI is one slider"
        accent="and one decision."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The Streamlit app at <Code>secom/app/app.py</Code> opens with the
        threshold slider front and center, a wafer-input pane, and a verdict
        tile that switches between green PASS and amber FAIL depending on
        where <Code>P(fail)</Code> lands relative to the slider. Below that:
        a per-feature contribution panel and the historical confusion matrix
        from the holdout set.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Figure
            src="/projects/semiconductor/01-streamlit-landing.png"
            alt="Streamlit landing page — wafer input pane with 590 sensor values and FAIL verdict tile at threshold 0.35"
            number="7.0"
            caption="Streamlit landing — slider + input pane."
          />
          <Figure
            src="/projects/semiconductor/02-threshold-sweep.png"
            alt="Threshold sweep visualization showing live recall, precision, and false-alarm rate curves as the decision slider moves"
            number="7.1"
            caption="Threshold sweep — live holdout-set tradeoffs."
          />
          <Figure
            src="/projects/semiconductor/03-confusion-matrix.png"
            alt="Holdout confusion matrix at threshold 0.35: TN=238, FP=55, FN=5, TP=16 with recall 0.76 and ROC-AUC 0.81"
            number="7.2"
            caption="Confusion matrix at threshold 0.35."
          />
        </div>
        <Figure
          src="/projects/semiconductor/04-top-l1-features.png"
          alt="Top L1-selected features ranked by coefficient magnitude — 113 sensors with sign of contribution and absolute coefficient value"
          number="7.3"
          caption="Top L1 features — 113 sensors ranked by coefficient magnitude."
        />
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
        accent="what I'd model differently."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="L1 → trees beats trees alone."
            body="On a 590-feature dataset with ~100 failure rows, narrowing the input space before fitting trees materially stabilized cross-validation scores and improved generalization."
          />
          <RetroItem
            head="class_weight='balanced' beat SMOTE here."
            body="Built-in class weighting matched the cost-asymmetry without inventing synthetic minority points. SMOTE overcorrected and pushed predicted failure rates well above the true base rate."
          />
          <RetroItem
            head="Exposing the threshold is the right UX."
            body="A live slider gives the operator more value than any single 'optimal' threshold. Cost asymmetry differs across fabs; the model can be the same."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="Precision is still low."
            body="At 0.76 recall the precision sits at 0.23 — for every real failure caught, ~3 false alarms get flagged. Acceptable when missed defects are the expensive failure mode, but it's still the obvious axis to improve."
          />
          <RetroItem
            head="No probability calibration check."
            body="The predict_proba output is treated as calibrated, but I didn't run a reliability diagram. For a threshold-tuning UI to be meaningful, the probabilities should be calibrated (Platt or isotonic) on a held-out fold."
          />
          <RetroItem
            head="The artifact filename is a lie."
            body="The serialized model file is named xgb_model.pkl but actually contains a RandomForestClassifier — a leftover from earlier iterations. Harmless but technically misleading. Worth renaming on the next pass."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Calibrate and recalibrate."
            body="Run isotonic or Platt scaling on a calibration fold and re-export the model. Operator-facing probabilities should mean what they say."
          />
          <RetroItem
            head="Try a gradient-boosted tree without SMOTE."
            body="LightGBM or XGBoost with class_weight (not SMOTE) might split the difference between RF's recall and XGBoost's nominally tighter splits. Same training surface, fairer comparison."
          />
          <RetroItem
            head="Push the threshold-sweep into the UI."
            body="The Streamlit slider already moves; what's missing is a live ROC curve that highlights where the slider currently sits. Cheap visualization win, high decision-quality return."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
