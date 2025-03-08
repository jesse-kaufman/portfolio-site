---
date: 2025-03-05T17:00:56-06:00
draft: false
title: Media conversion and standardization tool
description: ""
tags:
  - node.js
  - express.js
---
[{{< svg name="github" >}} Github](https://github.com/jesse-kaufman/video-edit)

This custom-built video editing tool automates multiple tasks to streamline the process of converting and editing videos, making it efficient and easy vs having to remeber ffmpeg command line switches.

## Tech Stack

- **Node.js**: Provides the backend environment for building and executing the media conversion logic.
- **FFmpeg**: The core tool for media processing, handling video and audio conversion, stream data extraction, and metadata reading from multimedia files.

## Features

- **Video Conversion:** Converts video files to **HEVC (H.265)** format for efficient compression and high-quality playback.
- **Audio Conversion:** Converts audio to the **AAC** codec, ensuring compatibility across devices and maintaining audio quality.
- **Metadata Management:** Sets proper **metadata**, such as title, description, and other relevant attributes, to ensure videos are organized and accessible.
- **Asynchronous Operation:** Extracts all subtitles and starts conversion process at the same time for optimum efficency.

In addition to the core video and audio conversions, the tool offers several advanced features to further enhance the media editing process:

- **Non-English Audio Removal:** Strips non-English audio tracks to save space and simplify the viewing experience.
- **Subtitle Extraction:** Extracts subtitles from videos, allowing easy access for translation or accessibility.
- **MKV Conversion:** Converts processed files into the **MKV (Matroska)** container format, supporting multiple audio streams, video, subtitles, and metadata.

The tool also provides flexibility with two distinct quality settings:

- **Regular Quality:** Provides optimal video and audio output for general use, ensuring high quality for most scenarios.
- **TV Quality:** Lowers resolution and bitrate to reduce file size, ideal for streaming or devices with limited storage.

## Outcomes

By automating these tasks, the tool saves me time, reduces manual effort, and ensures a more efficient video editing workflow, making it easy to keep my media files in a standardized format. It’s an invaluable asset for anyone managing large video collections or needing to convert media for various platforms.
