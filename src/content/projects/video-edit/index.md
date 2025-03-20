---
date: 2025-03-05T17:00:56-06:00
title: Media conversion and standardization tool
description: This custom-built video editing tool automates multiple tasks to streamline the process of converting and editing videos, making it efficient and easy vs having to remeber ffmpeg command line switches.
tags:
  - Express.js
  - Node.js
---
[{{< svg name="github" >}} Github](https://github.com/jesse-kaufman/video-edit)

This custom-built video editing tool automates multiple tasks to streamline the process of converting and editing videos, making it efficient and easy vs having to remeber ffmpeg command line switches.

## Tech Stack

- **Node.js**: Provides the backend environment for building and executing the media conversion logic.
- **FFmpeg**: The core tool for media processing, handling video and audio conversion, stream data extraction, and metadata reading from multimedia files.
- **pgsrip**: Converts image-based PGS subtitles to text-based SRT subtitles.

## Features

- **Video conversion:** Converts video files to **HEVC (H.265)** format for efficient compression and high-quality playback.
- **Audio conversion:** Converts audio to the **AAC** codec, ensuring compatibility across devices and maintaining audio quality.
- **Metadata management:** Sets proper **metadata**, such as title, description, and other relevant attributes, to ensure videos are organized and accessible.
- **Asynchronous operation:** Extracts/converts all subtitles and starts conversion process at the same time for optimum efficency.

In addition to the core video and audio conversions, the tool offers several advanced features to further enhance the media editing process:

- **Non-English audio removal:** Strips non-English audio tracks to save space and simplify the viewing experience.
- **Subtitle extraction:** Extracts subtitles from videos, allowing easy access for translation or accessibility.
- **Subtitle conversion:** Converts any image-based PGS subtitles to text-based SRT subtitles using pgsrip.
- **Container conversion:** Converts processed files into the **MKV (Matroska)** container format, supporting multiple audio streams, video, subtitles, and metadata.

The tool also provides flexibility with two distinct quality settings:

- **Regular quality:** Provides optimal video and audio output for general use, ensuring high quality for most scenarios.
- **TV quality:** Lowers resolution and bitrate to reduce file size, ideal for streaming or devices with limited storage.

## Outcomes

By automating these tasks, the tool saves me time, reduces manual effort, and ensures a more efficient video editing workflow, making it easy to keep my media files in a standardized format. It’s an invaluable asset for anyone managing large video collections or needing to convert media for various platforms.

## Installation

To run, first clone this repo:

```bash
git clone https://github.com/jesse-kaufman/video-edit
```

Then install the dependencies:

```bash
`npm ci`
```

## Usage

```bash
npm start [command] [inputFile]
```

---

## Commands

### `extract-subs`

Extracts all text-based English subtitles from input file to subrip format.

### `cleanup`

- Runs `extract-subs`
- Strips all non-English audio streams
- Strips all non-English subtitles
- Sets language to "eng" on all streams
- Sets audio / subtitle stream titles appropriately

### `convert-audio`

- Removes all non-English audio streams
- Converts all remaining audio streams to AAC (if not already in AAC format)
  - _Uses `libfdk_aac` encoder if present, otherwise falls back to the default `aac` encoder_
- Sets language metadata on audio stream to "eng"

### `convert-video`

- Converts main video stream to h265

### `full`

- Runs `extract-subs`
- Removes all non-English audio streams
- Removes all non-English subtitle streams
- Removes all text-based subtitle streams
- Maps and converts all remaining audio streams to AAC (if not already in that format)
- Maps and converts primary video stream to h265 (if not already in that format)
- Maps all remaining image subtitle streams

### `set-meta`\*

Sets metadata on streams in input file.

### `info`\*

Prints file/stream info for input file.

_\* Commands marked with an asterisk are not yet implemented._

---

## To Do List

- [ ] Add `set-meta` command
  - [ ] Set title for all stream types
  - [ ] Set language for all stream types
  - [ ] Set default audio stream
- [ ] Add `info` command
- [ ] Print list of input file streams and proposed output file streams before processing
  - _Input file stream info is the same as `info` command_
- [ ] Add summary after processing
