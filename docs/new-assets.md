# Hooligan Hymnal Assets Guide

This document describes the photos, graphics, and fonts that may be used by your supporter group's customized version of the open source Hooligan Hymnal mobile app. It is intended to supplement the deployment instructions found in `deployment.md`, and is targetted at a graphic designers or other people who may help with creating or collecting these assets.

Please review the project README for a description of the platform and the philosophy behind it.
https://github.com/Chattahooligans/hooligan-hymnal-app/blob/master/README.md

# Introduction

Deployments of Hooligan Hymnal can be customized to some degree to match the branding of your SG by using colors and fonts for the application, as well as select images and logo graphics. This guide will list files you and your collaborators should create or collect, along with descriptions of how each is used.

Hooligan Hymnal is an open source project, and your developers may have grander ambitions to alter the application design in mind (we sure hope they share the work back to the project), but this guide discusses a customization with minimal effort.

Most files are named for a generic purpose. `/assets/icon-ios.png` is the app icon used on iOS, `/assets/splash.png` is the splash screen displayed on the initial application load, and so on. These files are referenced in the `config.js` file. You can use these same file names without needing to change the config, or you can set your own file names, and easily edit the config file to match. There may (will) be cases where you need to add files that aren't part of the basic set.

The `config.js` file declares a `Skin` that is used throughout the code, and it refers to several other structures, which are outlined in this overly-simplified illustration. (Though Skin is further customizable if our example config doesn't meet the needs of your SG. Just ask in Slack.)

Skin
├── Images
├── Fonts
└── DefaultColors
    └── Palette

We recommend opening `config-example.js` and reviewing it as a companion to this guide. The file contains additional documentation, descriptions, and examples that should make life easier overall.

## Notes on file resolution, and a plea for help

With the advent of high pixel density phone displays, determining the target image height and width is tricky. You want to go big enough to look great on any phone screen, but not so large as to overly-inflate your app download size. And, of course, Apple and Google Play have their own ever-changing standards on icon sizes and formats. Our core team is all developer/no designer, so- in general, we've found icons should be 1024x2014, and logos and graphics should target at least/about 600px wide.

Open source is about sharing, and if you can find or help write a guide, we would very much welcome and be grateful for your contribution.

# Colors

Your SG's app should reflect your SG's brand, and the first step to that is color choice. Though not related to assets, this document is targetted at design-minded individuals, so this section briefly describes configuration of the Palette and using DefaultColors and Skin.

Note: The Hooligan Hymnal core team welcomes contributions and feedback on improving how colors are used in the app.

## Palette

`config.js` defines a Palette that is used to color backgrounds, text, and other UI elements throughout the app. It uses color names as keys and RGB, hex codes, or names as values.
https://www.w3schools.com/colors/default.asp

Populate this object with colors used by your SG and club. Without making modifications to the source code, the app is designed to look nice when using two colors- a Primary and a Secondary, plus or including black and white.
(TODO: rename Secondary to Accent, tracked at https://github.com/Chattahooligans/hooligan-hymnal-app/issues/121)

## DefaultColors

The config object DefaultColors sets a baseline of how colors will be used in the app. Text colors should contrast with backgrounds, and so on.

The Skin tends to refer to both Palette and DefaultColors.

# Fonts

If your SG uses a particular font in its branding, that can be easily dropped into Hooligan Hymnal and configured for use across the app. If not, Open Sans is provided as a default, and the internet is full of free and commercial typefaces. Check out the Google Fonts library as one place to get started-
https://fonts.google.com/

Whatever your choice, please consider including a reference to the license in the credits section of the About screen. (Instruct your developer to do this)

Once you select a typeface (or accept the default), it will be referenced in the config file for your app.

# Images