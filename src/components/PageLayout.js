import React, { useReducer, useEffect } from "react"
import { Link } from "gatsby"

import DocumentHead from "./DocumentHead"
import { GlobalStyle } from "../styles"

export default function PageLayout({ children }) {
  return (
    <React.Fragment>
      <DocumentHead />
      <GlobalStyle />
      {children}
      {
        // @todo #1 Allow a way for us to display a banner to tell users
        //  to refresh the browser. Our app may contain bugs and
        //  we might need users to refresh our website to get the new code.
      }
      <DevModeDisclaimer />
    </React.Fragment>
  )
}

function DevModeDisclaimer() {
  const [disclaimerHidden, hideDisclaimer] = useReducer(() => true, false)
  useEffect(() => {
    const t = setTimeout(() => hideDisclaimer(), 3000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div
      data-show-disclaimer={disclaimerHidden ? undefined : true}
      css={{
        display: "none",
        position: "absolute",
        background: "#F0324B",
        color: "#fff",
        top: 5,
        left: 5,
        transform: "rotate(-10deg)",
        padding: "5px 10px",
        opacity: 0.75,
        transition: "0.5s opacity",
        "&:hover, &[data-show-disclaimer]": {
          opacity: 1,
        },
      }}
    >
      <strong>In development</strong>
      <br />
      Using mock data
      <br />
      <Link
        to="/dev/kitchen-sink"
        css={{ color: "#ff0", textDecoration: "none" }}
      >
        &rarr; Go to kitchen sink!
      </Link>
      <br />
      <a
        href="https://github.com/codeforthailand/election-live"
        css={{ color: "#ff0", textDecoration: "none" }}
      >
        &rarr; Go to GitHub!
      </a>
    </div>
  )
}
