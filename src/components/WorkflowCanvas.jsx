import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiCpu, FiPhone, FiSend, FiCalendar, FiUsers, FiZap } from "react-icons/fi";
import "../css/workflow.css";

/**
 * The hero's signature: a real automation running on a loop.
 * Triggers fan into an AI agent, the agent fans out into actions —
 * the same shape a client sees in their own n8n canvas.
 */

const NODES = [
  { id: "t1", role: "trigger", icon: FiSend, label: "New enquiry", meta: "Webhook" },
  { id: "t2", role: "trigger", icon: FiPhone, label: "Inbound call", meta: "Voice agent" },
  { id: "agent", role: "agent", icon: FiCpu, label: "AI Agent", meta: "Reasoning + tools" },
  { id: "o1", role: "action", icon: FiUsers, label: "Lead scored", meta: "CRM" },
  { id: "o2", role: "action", icon: FiZap, label: "Reply sent", meta: "Email" },
  { id: "o3", role: "action", icon: FiCalendar, label: "Meeting booked", meta: "Calendar" },
];

/* Nodes are anchored by their CENTRE (x, y) and sized only in width — height
   comes from the content, so a label that wraps can never clip or collide with
   its own border. Edges are drawn centre-to-centre in the same 0–100 space
   (the SVG uses preserveAspectRatio="none", so it maps 1:1 to those percents)
   and their ends tuck under the nodes, which are opaque and painted on top. */
const WIDE = {
  ratio: "560 / 430",
  nodes: {
    t1: { x: 16.5, y: 28, w: 33 },
    t2: { x: 16.5, y: 65, w: 33 },
    agent: { x: 50, y: 46.5, w: 25 },
    o1: { x: 83.5, y: 16, w: 33 },
    o2: { x: 83.5, y: 46.5, w: 33 },
    o3: { x: 83.5, y: 78, w: 33 },
  },
  edges: [
    { id: "e1", stage: "in", d: "M16.5 28 C 33 28, 33 46.5, 50 46.5" },
    { id: "e2", stage: "in", d: "M16.5 65 C 33 65, 33 46.5, 50 46.5" },
    { id: "e3", stage: "out", d: "M50 46.5 C 67 46.5, 67 16, 83.5 16" },
    { id: "e4", stage: "out", d: "M50 46.5 L 83.5 46.5" },
    { id: "e5", stage: "out", d: "M50 46.5 C 67 46.5, 67 78, 83.5 78" },
  ],
};

const TALL = {
  ratio: "380 / 500",
  nodes: {
    t1: { x: 23.5, y: 11, w: 47 },
    t2: { x: 76.5, y: 11, w: 47 },
    agent: { x: 50, y: 48, w: 68 },
    o1: { x: 15.75, y: 87, w: 31.5 },
    o2: { x: 50, y: 87, w: 31.5 },
    o3: { x: 84.25, y: 87, w: 31.5 },
  },
  edges: [
    { id: "e1", stage: "in", d: "M23.5 11 C 23.5 30, 50 29, 50 48" },
    { id: "e2", stage: "in", d: "M76.5 11 C 76.5 30, 50 29, 50 48" },
    { id: "e3", stage: "out", d: "M50 48 C 50 68, 15.75 67, 15.75 87" },
    { id: "e4", stage: "out", d: "M50 48 L 50 87" },
    { id: "e5", stage: "out", d: "M50 48 C 50 68, 84.25 67, 84.25 87" },
  ],
};

/** Steps: 0 idle → 1 triggers fire → 2 agent thinks → 3 agent dispatches → 4 done → 5 hold */
const STEP_MS = [700, 900, 1100, 900, 1500, 700];

export default function WorkflowCanvas() {
  const [tall, setTall] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 760px)");
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setTall(narrow.matches);
      setReduced(motionOff.matches);
    };
    sync();
    narrow.addEventListener("change", sync);
    motionOff.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      motionOff.removeEventListener("change", sync);
    };
  }, []);

  // Reduced motion gets the finished state, no loop.
  useEffect(() => {
    if (reduced) {
      setStep(4);
      return;
    }
    const id = setTimeout(() => setStep((s) => (s + 1) % STEP_MS.length), STEP_MS[step]);
    return () => clearTimeout(id);
  }, [step, reduced]);

  const layout = tall ? TALL : WIDE;
  const isOn = (role) =>
    role === "trigger" ? step >= 1 : role === "agent" ? step >= 2 : step >= 4;
  const edgeFlowing = (stage) => (stage === "in" ? step === 1 : step === 3);
  const edgeLit = (stage) => (stage === "in" ? step >= 2 : step >= 4);

  return (
    <div className="wf" style={{ aspectRatio: layout.ratio }}>
      <div className="wf__chrome">
        <span className="wf__path">divlynx / lead-intake</span>
        <span className={`wf__status${step >= 4 ? " is-done" : ""}`}>
          <i className="wf__dot" />
          {step >= 4 ? "completed" : step >= 1 ? "running" : "waiting"}
        </span>
      </div>

      <div className="wf__stage">
        <svg className="wf__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {layout.edges.map((e) => (
            <g key={e.id}>
              <path className={`wf__wire${edgeLit(e.stage) ? " is-lit" : ""}`} d={e.d} pathLength="1" />
              <path
                className={`wf__spark${edgeFlowing(e.stage) ? " is-flowing" : ""}`}
                d={e.d}
                pathLength="1"
              />
            </g>
          ))}
        </svg>

        {NODES.map((node, i) => {
          const p = layout.nodes[node.id];
          const on = isOn(node.role);
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              className={`wf__node wf__node--${node.role}${on ? " is-on" : ""}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%` }}
              /* x/y carry the centring offset: framer owns `transform`, so it
                 cannot live in CSS alongside the entrance scale. */
              initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-50%" }}
              whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <span className="wf__icon">
                {node.role === "action" && on ? <FiCheck /> : <Icon />}
              </span>
              <span className="wf__text">
                <span className="wf__label">{node.label}</span>
                <span className="wf__meta">{node.meta}</span>
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="sr-only">
        Illustration of a Divlynx automation: a form submission and an inbound phone call both
        trigger an AI agent, which scores the lead in the CRM, sends a reply, and books a meeting.
      </p>
    </div>
  );
}
