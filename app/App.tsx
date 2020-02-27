import * as React from "react";
import { loadableReady } from '@loadable/component'

import Counter from "./components/Counter"

import { hydrate } from "react-dom"

loadableReady(() => {
  const root = document.getElementById('root')
  hydrate(<Counter />, root)
})