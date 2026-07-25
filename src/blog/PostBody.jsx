/** Renders the structured blocks defined in posts.js. */
export default function PostBody({ blocks }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="prose__h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="prose__h3">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="prose__list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="prose__list prose__list--ordered">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="prose__quote">
                {block.text}
              </blockquote>
            );
          case "note":
            return (
              <aside key={i} className="prose__note">
                {block.text}
              </aside>
            );
          default:
            return (
              <p key={i} className="prose__p">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
