import '../css/team.css'

export default function Team() {
  return (
    <section id="team" className="section team-section">
      {/* White ring lights background */}
      <div className="team-rings" aria-hidden="true">
        <span className="team-ring team-ring--tl" />
        <span className="team-ring team-ring--tr" />
        <span className="team-ring team-ring--bl" />
      </div>
      <div className="container text-center">
        <h3 className="title-section mb-sm">The Minds Behind divlynx</h3>
        <div className="team-motto">“Think Smart. Build Fearless.”</div>
        <p className="team-intro muted mb-md">At DivLynx, our strength lies in the synergy of innovation and intelligence. Our team of developers, designers, and strategists work together to craft solutions that merge creativity with technology — empowering businesses to automate, scale, and evolve in the digital era.

        We believe in collaboration, precision, and purpose-driven development, values that fuel every line of code, every pixel, and every solution we deliver.</p>
        {/* Cards removed as requested */}
        <p className="muted team-footer">We’re a team of thinkers, builders, and innovators — united by code, driven by creativity.</p>
      </div>
    </section>
  )
}