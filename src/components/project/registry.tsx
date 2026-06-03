/**
 * Per-project registry. When a project has a real screenshot mockup or a
 * fully-written case study, register it here so:
 *   - the homepage `<ProjectShowcase>` renders the real mockup
 *   - the case-study page (`/projects/[slug]`) renders the full custom body
 *     instead of the generic placeholder template
 *
 * Drop a new entry below as soon as a project has a real screenshot or rich
 * content ready.
 */

import type { ComponentType } from 'react'
import MetyMockup from './mockups/MetyMockup'
import MetyCaseStudy, { METY_SECTIONS } from './caseStudies/MetyCaseStudy'
import LaunchParametersCaseStudy, { LAUNCH_PARAMETERS_SECTIONS } from './caseStudies/LaunchParametersCaseStudy'
import LaunchMockup from './mockups/LaunchMockup'
import AegisflowMockup from './mockups/AegisflowMockup'
import AegisflowCaseStudy, { AEGISFLOW_SECTIONS } from './caseStudies/AegisflowCaseStudy'
import MissingPersonsMockup, { MissingPersonsHeroMockup } from './mockups/MissingPersonsMockup'
import MissingPersonsCaseStudy, { MISSING_PERSONS_SECTIONS } from './caseStudies/MissingPersonsCaseStudy'
import DistributedKvMockup from './mockups/DistributedKvMockup'
import DistributedKvCaseStudy, { DISTRIBUTED_KV_SECTIONS } from './caseStudies/DistributedKvCaseStudy'
import PixelDriveMockup from './mockups/PixelDriveMockup'
import PixelDriveCaseStudy, { PIXELDRIVE_SECTIONS } from './caseStudies/PixelDriveCaseStudy'
import SemiconductorMockup from './mockups/SemiconductorMockup'
import SemiconductorCaseStudy, { SEMICONDUCTOR_SECTIONS } from './caseStudies/SemiconductorCaseStudy'
import GenomeAssemblerMockup from './mockups/GenomeAssemblerMockup'
import GenomeAssemblerCaseStudy, { GENOME_ASSEMBLER_SECTIONS } from './caseStudies/GenomeAssemblerCaseStudy'
import JobHuntMockup from './mockups/JobHuntMockup'
import JobHuntCaseStudy, { JOB_HUNT_SECTIONS } from './caseStudies/JobHuntCaseStudy'
import ZebradoodleMockup from './mockups/ZebradoodleMockup'
import ZebradoodleCaseStudy, { ZEBRADOODLE_SECTIONS } from './caseStudies/ZebradoodleCaseStudy'

export interface ProjectEntry {
  /** Custom mockup component shown inside the window (homepage card). */
  Mockup?: ComponentType
  /**
   * Optional override for the case-study hero. When set, the case-study page
   * uses this instead of `Mockup` for the hero section. The homepage card
   * still uses `Mockup`. Useful when the homepage wants a faux vignette but
   * the case study hero should show a real screenshot.
   */
  HeroMockup?: ComponentType
  /**
   * Which window kind to wrap the mockup in. Defaults to 'browser'.
   * Use 'terminal' for backend / infra projects (AegisFlow, Distributed KV);
   * 'editor' when the mockup is code-flavored (philosophy-like snippets).
   */
  mockupWindow?: 'browser' | 'terminal' | 'editor'
  /** Full custom case-study body (replaces the placeholder template). */
  CaseStudy?: ComponentType
  /** Sidebar sections for the case study. Required when CaseStudy is set. */
  sections?: Array<{ id: string; label: string }>
}

export const PROJECT_REGISTRY: Record<string, ProjectEntry> = {
  'mety-legal': {
    Mockup: MetyMockup,
    CaseStudy: MetyCaseStudy,
    sections: METY_SECTIONS,
  },
  'launch-parameters': {
    Mockup: LaunchMockup,
    CaseStudy: LaunchParametersCaseStudy,
    sections: LAUNCH_PARAMETERS_SECTIONS,
  },
  aegisflow: {
    Mockup: AegisflowMockup,
    mockupWindow: 'browser',
    CaseStudy: AegisflowCaseStudy,
    sections: AEGISFLOW_SECTIONS,
  },
  'missing-persons': {
    Mockup: MissingPersonsMockup,
    HeroMockup: MissingPersonsHeroMockup,
    CaseStudy: MissingPersonsCaseStudy,
    sections: MISSING_PERSONS_SECTIONS,
  },
  'distributed-kv': {
    Mockup: DistributedKvMockup,
    mockupWindow: 'terminal',
    CaseStudy: DistributedKvCaseStudy,
    sections: DISTRIBUTED_KV_SECTIONS,
  },
  pixeldrive: {
    Mockup: PixelDriveMockup,
    CaseStudy: PixelDriveCaseStudy,
    sections: PIXELDRIVE_SECTIONS,
  },
  semiconductor: {
    Mockup: SemiconductorMockup,
    CaseStudy: SemiconductorCaseStudy,
    sections: SEMICONDUCTOR_SECTIONS,
  },
  'genome-assembler': {
    Mockup: GenomeAssemblerMockup,
    mockupWindow: 'terminal',
    CaseStudy: GenomeAssemblerCaseStudy,
    sections: GENOME_ASSEMBLER_SECTIONS,
  },
  'job-hunt': {
    Mockup: JobHuntMockup,
    CaseStudy: JobHuntCaseStudy,
    sections: JOB_HUNT_SECTIONS,
  },
  zebradoodle: {
    Mockup: ZebradoodleMockup,
    CaseStudy: ZebradoodleCaseStudy,
    sections: ZEBRADOODLE_SECTIONS,
  },
}

export const getMockup = (id: string): ComponentType | undefined =>
  PROJECT_REGISTRY[id]?.Mockup

/** Returns the HeroMockup if set, otherwise falls back to Mockup. */
export const getHeroMockup = (id: string): ComponentType | undefined =>
  PROJECT_REGISTRY[id]?.HeroMockup ?? PROJECT_REGISTRY[id]?.Mockup

export const getMockupWindow = (id: string): ProjectEntry['mockupWindow'] =>
  PROJECT_REGISTRY[id]?.mockupWindow

export const getCaseStudy = (id: string): ComponentType | undefined =>
  PROJECT_REGISTRY[id]?.CaseStudy

export const getSections = (id: string) =>
  PROJECT_REGISTRY[id]?.sections
