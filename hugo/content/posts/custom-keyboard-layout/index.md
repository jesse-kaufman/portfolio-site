---
date: 2025-03-22T00:00:56-06:00
title: Custom keyboard layout/firmware (ErgoDox)
description: This custom keyboard layout is designed to reduce strain on the hands—especially the pinkies—while improving typing speed and efficiency, particularly for developers.
params:
  github: https://github.com/jesse-kaufman/jk_ergodox_qmk_keymap/
images:
  - keyboard.webp
tags:
  - C
  - ErgoDox
  - QMK
---
## Overview

This custom keyboard layout is designed to reduce strain on the hands—especially the pinkies—while improving typing speed and efficiency, particularly for developers. The layout utilizes custom firmware running on QMK and features multiple layers tailored for different tasks, including standard typing, numeric input, symbols, and coding.

{{< figure src="keyboard.webp" alt="Photograph of keyboard and trackball on desk." caption="Photograph of keyboard and trackball on desk." >}}

### Diagram conventions

In the diagrams below, there are a few conventions in use. The main text on a key (centered) represents what is typed or the command when the key is PRESSED. Smaller text on the front of keys in a salmon color represent what is typed or the command when the key is HELD.

In the diagrams of layers other than BASE, keys that are unimportant to that layer are rendered flat and lighter in color. Salmon-colored flat keys represent the key being held down to access the layer. For keys that type alpha characters on the BASE layer that are flat on another layer, the keys do nothing. Keys in the thumb clusters and non-alpha characters perform the same function as on the BASE layer.

## Goals

- Minimize hand and finger strain—especially on pinkies
- Speed up typing by reducing the number of key presses required for common actions
- Enable quick access to frequently used coding symbols and shortcuts
- Use multi-key combinations (chords) to improve workflow efficiency
- Implement a leader key for launching applications

## Layers

The keyboard features 5 main layers:

- **BASE** – standard typing layer optimized for comfort and speed, based on Colemak-DH layout
- **NUM** – numeric entry layer providing 9-key entry without leaving home row
- **SYM** – symbol entry layer for punctuation and special characters
- **CODE** – coding-specific layer with quick access to commonly used syntax and command line elements
- **FN** – function layer providing quick access to arrow keys without leaving home row

## **BASE Layer**

- Uses the Colemak-DH layout for efficient alphabetic character placement
- All non-alphabetic keys remain the same across all layers
- LEDs under keys glow green while on BASE layer

{{< figure src="base-layer.webp" alt="BASE layer on keyboard." caption="BASE layer on keyboard." >}}

### Modifiers

All modifiers (Control, Shift, Option, Command) function as one-shot keys, meaning they activate on tap and wait for the next keypress before performing the related action.

### Special keys

#### Parentheses `()` key

- Pressing the key types `()` then moves the cursor between them for rapid typing of parenthetical text
- Holding the key types `""` and then places the cursor between the quotes for rapid typing of quoted text

#### New tab / minimize window key

- Pressing the key opens a new tab
- Holding the key minimizes the currently active window

#### Apostrophe

- Holding `E` types an apostrophe (`'`)

### Combos / Chords

Certain key combinations trigger specific actions:

- **Backspace**: `N` + `E`
- **Double quote (`"`)**: `E` + `I`
- **Escape**: `W` + `F`
- **Tab**: `S` + `T`
- **Copy**: `X` + `C`
- **Paste**: `C` + `D`
- **Cut**: `X` + `D`
- **Save**: `F` + `P`
- **Reset zoom**: `Zoom In` + `Zoom Out`
- **Mute**: `Vol+` + `Vol-`
- **Home**: `PgUp` + `O`
- **End**: `PgDn` + `?`
- **Switch to last app (`⌘`+`Tab`)**:
  - Left hand: `R` + `S` + `T`
  - Right hand: `N` + `E` + `I`
- **Bootloader (load new firmware)**: blue key on upper-left + `Z`

### Leader key – launching apps

The leader key functions similarly to Vim's leader key, providing fast application launching:

1. Pressing the leader key starts leader mode
2. Typing specific key sequences triggers predefined actions via Keyboard Maestro using `HYPER`[^1] key combinations
3. If an unmapped sequence is typed, the system defaults to opening Spotlight Search and entering the typed characters

#### Example mappings

- `LEADER` + `T` → open Terminal
- `LEADER` + `S` → open Browser
- `LEADER` + `LR` → open Adobe Lightroom
- `LEADER` + `SMS` → open Messages
- `LEADER` + `PLAY/PAUSE` → open Music

#### Timing

The system waits indefinitely for input unless the leader key is tapped again (which brings up an empty Spotlight Search). If a letter is typed after the leader key, the system waits five seconds for further input before executing the command, or commands can be executed immediately by pressing Return.

### META keys – in-app commands

The META keys provides quick access to application-specific commands:

- **Safari**:
  - Tap `META` to reload the page.
  - Hold `META` to force reload.
  - Tap `META2` to open/close Developer Tools
- **VSCodium**:
  - Tap `META` to toggle terminal visibility.
- **Vim**:
  - `META` + `Arrow Key` navigates between Vim panes.

## **NUM Layer**

- Activated by holding the `S` key (left hand) or tapping the `L. NUM` key (right hand).
- Turns the right-hand alpha keys into a 9-key number pad.

### Special keys

- Holding `3` types a period (`.`)
- Holding `2` types a comma (`,`)

{{< figure src="num-layer.webp" alt="NUM layer on keyboard." caption="NUM layer on keyboard." >}}

## **SYM Layer**

This layer is optimized for quick symbol entry without extra key presses. Lesser-used and advanced symbols (such as those accessible while holding Option) are accessible via key holds instead of requiring option or shift keys to be held while pressing a key.

### Special features

- Type `<=` and `>=` by holding `<` and `>` respectively
- Type en dash (`–`) and em dash (`—`) by holding `-` and `=` respectively
- Type `#!` by holding `#`
- Type `()` followed by the left key by holding `(`
- Type `{}` followed by the left key by holding `[]` key
- Type `“`, `”`, `‘`, `’` without holding option or shift

{{< figure src="sym-layer.webp" alt="SYM layer on keyboard." caption="SYM layer on keyboard." >}}

## **CODE Layer**

Streamlines code entry by mapping common syntax and command line elements such as:

- `=>`, `->`
- `/**`, `/*`, `*/`
- `[`, `]`, `{`, `}`
- `<>`, `</>`
- `~/`, `../`, `./`

### Additional features

- Type `/**` by holding `/*` key
- Type `[]` followed by the left key by holding `{}` key

{{< figure src="code-layer.webp" alt="CODE layer on keyboard." caption="CODE layer on keyboard." >}}

## **FN Layer**

- Optimized access to arrow keys and other keyboard-based navigation without needing to leave the home row
- Engaged by holding down `T` on the left hand or tapping one of the `L.FN` keys
- Exit layer by releasing `T` or tapping one of the `L.BASE` keys (same keys that enter `L.FN`)
- Holding `S` while holding `T` engages the NUM layer as long as `S` is held and reverts to FN layer when released

{{< figure src="fn-layer.webp" alt="Photograph of keyboard and trackball on desk." caption="Photograph of keyboard and trackball on desk." >}}

### Special keys

Various `MEH`[^2] combinations are available on the left hand, which are used for in-app commands (primarily used in Lightroom when activating the FN layer through the `L.FN` key, not the momentary activation provided by holding `T`)

[^1]: `HYPER` is shorthand for `SHIFT`+`⌃`+`⌥`+`⌘`+`P`; for example `HYPER`+`P` is `SHIFT`+`⌃`+`⌥`+`⌘`+`P`
[^2]: `MEH` is shorthand for `SHIFT`+`⌃`+`⌥`; for example `MEH`+`P` is `SHIFT`+`⌃`+`⌥`+`P`

## **Keycaps & switches**

### Keycaps

Most of the keycaps are from the awesome [Susuwatari](https://drop.com/buy/drop-matt3o-mt3-susuwatari-custom-keycap-set) set by MATT30, which uses the [MT3 profile](https://matt3o.com/mt3-keycap-profile-a-brief-history/). It has a look and feel that reminds me of an old terminal keyboard. I wanted the shiny look of those old keycaps, so I polished the Susuwatari keycaps to have a nice, smooth feel of old, worn keycaps.

The `SPACE` and `ENTER` keys use G20 keycap profiles, so they're extremely low-profile and only have a slight angle toward my thumb. This allow my thumb to rest slightly lower than the other fingers, providing more ergonomics.

Some of the keys are mounted sideways to better accommodate the shape of my hand and the angle of attack when pressing a key. Since I only ever use my thumb for the `K` key, the keycap is mounted upside down to improve comfort. The option and command keys on the left hand are at different orientations to allow differentiation by feel alone.

### Switches

- Most of the switches on the keyboard are Outemu low-profile brown switches for feedback without an audible click
- Switches for keys that change layers use Outemu low-profile blue switches for a nice, click-y sound and feel
- Modifiers, arrow keys, `PgUp`/`PgDn` and both thumb keys use Outemu low-profile black switches, for a buttery-smooth feel with no bump and extremely fast reaction (especially nice on arrow keys)
- Volume control and zoom keys use Akko blacks with extra heavy springs
- Other keys use Akko CS Sponge switches

All switches have been hand-lubed for the best sound and feel and after a few years in use, all the keys are buttery-smooth with no scratchiness or spring ping.

## Future plans

- Move backspace to `M` + `N` to reduce accidental firing; as I get faster in Colemak the current combo is occasionally fired because of the frequency of `N` + `E` being used together
- Change modifiers to be one-shot if tapped, and momentary if held. Currently, holding for a second then letting go still engages one-shot mode, which can be confusing/frustrating

## Conclusion

This keyboard layout significantly reduces hand strain while improving typing speed and workflow efficiency for developers. By incorporating multiple layers, intuitive combos, a leader key for launching apps, and META keys for in-app shortcuts, this layout is an advanced solution for programmers seeking ergonomic and rapid input solutions.

Hands down, though, the switch to Colemak-DH has been the biggest improvement to my keyboard setup. Even on my laptop, I notice less strain on my hands.
