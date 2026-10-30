import "../css/workflow.css";

export default function WorkflowCanvas() {
  return (
    <figure className="workshop" aria-label="Digital workshop connecting product interfaces, AI automation, voice agents, workflows, and mobile apps">
      <img
        className="workshop__image"
        src="/digital-workshop-hero.png"
        width="1536"
        height="1024"
        alt="Isometric digital workshop with a mechanical arm assembling a browser interface"
        fetchPriority="high"
        decoding="async"
      />
      <span className="workshop__label workshop__label--browser"><i />Product interface</span>
      <span className="workshop__label workshop__label--arm"><i />AI assembly arm</span>
      <span className="workshop__label workshop__label--voice"><i />Voice agents</span>
      <span className="workshop__label workshop__label--flow"><i />Workflow automation</span>
      <span className="workshop__label workshop__label--mobile"><i />Mobile apps</span>
    </figure>
  );
}
