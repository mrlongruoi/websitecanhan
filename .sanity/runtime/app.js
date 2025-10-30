
// This file is auto-generated on 'sanity dev'
// Modifications to this file are automatically discarded
import studioConfig from "..\\..\\sanity.config.ts"
import {renderStudio} from "sanity"

const container = document.getElementById("sanity");
  if (!container) {
    throw new Error('Element with id "sanity" not found. Sanity Studio requires this element to mount.');
  }

renderStudio(
  container,
  studioConfig,
  {reactStrictMode: false, basePath: "/"}
)
