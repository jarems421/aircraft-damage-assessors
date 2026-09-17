# Interactive aircraft damage-area selector

The homepage hero and the damage assessment page use an original, unbranded civilian light-aircraft model. It is illustrative and does not establish aircraft-type expertise.

## Model and rendering

`createAircraft.ts` builds smooth fuselage stations, flush skin-following glazing, tapered airfoil wings, control-surface seams, shaped propeller blades, landing-gear details and subtle metal fittings. Geometry is local and authored for this site; no third-party model licence or asset download is required.

`aircraftScene.ts` loads Three.js on demand. Studio lighting uses a prefiltered room environment for material reflections, based on the [Three.js RoomEnvironment documentation](https://threejs.org/docs/pages/RoomEnvironment.html). Camera distance is fitted to key aircraft extremities per elevation, across every heading, so turning the model never changes its apparent size; only tilting towards the top view moves the camera back. Drag and button input set target angles that ease smoothly (instantly under reduced motion), and the near side of the aircraft follows the pointer.

Pixel density is capped at 1.5. Rendering happens only on input, easing or resize, with no idle spin. GPU resources and listeners are disposed on unmount.

`aircraft-still.webp` is shown while the 3D view loads, on every screen size. With data saver on, it stays until the visitor presses "View in 3D", so Three.js is not downloaded unless requested. Regenerate it with `node scripts/capture-aircraft-still.cjs` against a running production server after changing the model or default angle.

Meshes are tagged with a damage area in `createAircraft.ts` (`zone`). Selected areas are tinted blue; each tagged mesh owns its material so tints never bleed between areas.

## Interaction

Visitors indicate where an aircraft is damaged. Five numbered markers on the model share state with a native control: a select in the compact (homepage) variant, a radio list in the full (damage assessment) variant. Markers hidden behind the aircraft from the current angle are faded but stay selectable.

The component is a GET form to `/contact`, submitting `service=damage-assessment` and `area=<id>`. The contact form preselects the area. Because it is a plain form, selection works without JavaScript or WebGL.

The propeller turns while the model is handled and winds down when released, and the aircraft eases into its resting angle on load; both are skipped under reduced motion, and neither animates on idle. Mouse dragging controls azimuth and elevation; horizontal touch dragging rotates while vertical gestures still scroll the page. Buttons provide rotation, top view and reset.

Areas live in `src/data/assessmentZones.ts`. They are enquiry inputs only — do not attach area-specific service claims to them. Replacement geometry should retain the coordinate system or update those positions and camera extremities together.

## Checks

Run type checking, lint and production build, then `node scripts/check-aircraft.cjs`. Set `AIRCRAFT_TEST_URL` to the server URL (default port 3002). Screenshots are written to `screenshots/aircraft/`.
