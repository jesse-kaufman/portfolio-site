---
date: 2025-03-22T00:00:56-06:00
title: Custom keyboard layout/firmware (ErgoDox)
description: This custom keyboard layout is designed to reduce strain on the hands—especially the pinkies—while improving typing speed and efficiency, particularly for developers.
github: https://github.com/jesse-kaufman/jk_ergodox_qmk_keymap/
images:
  - /projects/custom-keyboard-layout/keyboard.webp
tags:
  - C
  - ErgoDox
  - QMK
---
## Overview

This custom keyboard layout is designed to reduce strain on the hands—especially the pinkies—while improving typing speed and efficiency, particularly for developers. The layout utilizes custom firmware running on QMK and features multiple layers tailored for different tasks, including standard typing, numeric input, symbols, and coding.

{{< figure src="/projects/custom-keyboard-layout/keyboard.webp" alt="Photograph of keyboard and trackball on desk." caption="Photograph of keyboard and trackball on desk." >}}

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

{{< figure src="/projects/custom-keyboard-layout/base-layer.webp" alt="BASE layer on keyboard." caption="BASE layer on keyboard." >}}

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

{{< figure src="/projects/custom-keyboard-layout/num-layer.webp" alt="NUM layer on keyboard." caption="NUM layer on keyboard." >}}

## **SYM Layer**

This layer is optimized for quick symbol entry without extra key presses. Lesser-used and advanced symbols (such as those accessible while holding Option) are accessible via key holds instead of requiring option or shift keys to be held while pressing a key.

### Special features

- Type `<=` and `>=` by holding `<` and `>` respectively
- Type en dash (`–`) and em dash (`—`) by holding `-` and `=` respectively
- Type `#!` by holding `#`
- Type `()` followed by the left key by holding `(`
- Type `{}` followed by the left key by holding `[]` key
- Type `“`, `”`, `‘`, `’` without holding option or shift

{{< figure src="/projects/custom-keyboard-layout/sym-layer.webp" alt="SYM layer on keyboard." caption="SYM layer on keyboard." >}}

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

*\* additional details coming soon.*

{{< figure src="/projects/custom-keyboard-layout/code-layer.webp" alt="CODE layer on keyboard." caption="CODE layer on keyboard." >}}

## **FN Layer**

- Optimized access to arrow keys and other keyboard-based navigation without needing to leave the home row
- Engaged by holding down `T` on the left hand or tapping one of the `L.FN` keys
- Exit layer by releasing `T` or tapping one of the `L.BASE` keys (same keys that enter `L.FN`)
- Holding `S` while holding `T` engages the NUM layer as long as `S` is held and reverts to FN layer when released

{{< figure src="/projects/custom-keyboard-layout/fn-layer.webp" alt="Photograph of keyboard and trackball on desk." caption="Photograph of keyboard and trackball on desk." >}}

### Special keys

Various `MEH`[^2] combinations are available on the left hand, which are used for in-app commands (primarily used in Lightroom when activating the FN layer through the `L.FN` key, not the momentary activation provided by holding `T`)

[^1]: `HYPER` is shorthand for `SHIFT`+`⌃`+`⌥`+`⌘`+`P`; for example `HYPER`+`P` is `SHIFT`+`⌃`+`⌥`+`⌘`+`P`
[^2]: `MEH` is shorthand for `SHIFT`+`⌃`+`⌥`; for example `MEH`+`P` is `SHIFT`+`⌃`+`⌥`+`P`

*\* Additional details coming soon.*

## Future plans

- Move backspace to `M` + `N` to reduce accidental firing; as I get faster in Colemak the current combo is occasionally fired because of the frequency of `N` + `E` being used together
- Change modifiers to be one-shot if tapped, and momentary if held. Currently, holding for a second then letting go still engages one-shot mode, which can be confusing/frustrating

## Conclusion

This keyboard layout significantly reduces hand strain while improving typing speed and workflow efficiency for developers. By incorporating multiple layers, intuitive combos, a leader key for launching apps, and META keys for in-app shortcuts, this layout is an advanced solution for programmers seeking ergonomic and rapid input solutions.
