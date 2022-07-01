# Xaiat - A résumé tailor

> Note: this version is incredibly limited and rather useless. I am mostly posting it here for documentation and future reference. There is a single template (my personal one) and you need to edit code to create a résumé.

## Dependencies

You just need to have Node.js installed on your computer. You can download a copy from [here](https://nodejs.org/en/).

## Set-up

To get started, simply clone the repo on your machine. Then, make a copy of the _resume_template.json_ file found under _templates_ and place it in the project's root directory. Rename it (**this is important**) _resume.json_. From there, simply add your information to the JSON file. An array means you can have multiple entries so feel free to make as many copies of the objects as you need — just remember the comma.

Once you are happy with your JSON file, you can simply `cd` into the project's root directory and run:

```bash
npm install
node generator.js
```

Then, all that's left is for you to open _public/resume.html_ and print the page (Cmd+P on Mac, Ctrl+P on Windows) and _Save as PDF_. Just make sure "Background graphics" (or browser equivalent) is checked to get the colors and the lines.

## Customization

As I said, this release is far from finished and it's more like a proof of concept. That being said, the templates in _templates/parsuli_ should be readable enough with a little bit of PugJS experience. You can easily change the order of sections (or take some out), for example, by modifying _resume.pug_ and playing around with the `include`s.
