/**
 * Semiconductor Yield Predictor — homepage card thumbnail.
 *
 * The faux Streamlit panel was screenshotted from the rendered mockup and
 * saved as a static PNG, so the card always looks exactly right without
 * re-rendering the JSX version at runtime.
 */
/* eslint-disable @next/next/no-img-element */
export default function SemiconductorMockup() {
  return (
    <img
      src="/projects/semiconductor/thumbnail.png"
      alt="Semiconductor Yield Predictor — threshold slider at 0.35, FAIL prediction tile with P(fail)=0.42, top L1 sensors sidebar"
      className="w-full block"
      loading="lazy"
    />
  )
}
