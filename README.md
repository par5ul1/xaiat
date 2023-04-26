# Xaiat - A résumé tailor

> Note: this is a work-in-progress. The code has still not been documented and certain behavior is subject to change. Still, the current code should be completely usable and free from major bugs.

## How do I use it?

Two ways. You can either use a live version [here](#) (Not Currently Live), or you can clone the repo and run it on your machine locally. The steps for that can be found below:

## Dependencies

You first need to have Node.js installed on your computer. If you don't already, you can download a copy from [here](https://nodejs.org/en/).

## Set-up

To get started, simply clone the repo on your machine. Then, you can `cd` into the project's directory and run `npm install` to install all the package dependencies. This project uses Vite, so npm should also install that.

Once the packages have been installed, you can simply `npm run dev` to host the app on your localhost. Vite will give you the port number in the console.

## Contribution and customization

Currently, the app is still in progress. I am adding new features and polishing up other ones. If you wish to help, please consult the TODO list below for a list of things that still need implementing or fixing. Feel free to open an Issue to ask for clarification.

There is currently only one template available, and you can only customize the accent color and the font (from the Settings page). If you have React knowledge and want to contribute a template, open an Issue and we can figure out how to do that. I do plan on expanding the template library and standardizing the template creation process (see TODOs below) but it is fairly low on my priorities list right now.

## TODOs:

- [ ] Add better documentation to the source code

- [ ] Add a WYSIWYG instead of allowing users to write custom HTML tags

- [ ] Attempt to sort items by date

- [ ] Allow for expanding inputs for bullet points

- [ ] Validate links before trying to hyperlink them in the resume

- [ ] Allow the user to modify profile locally per-resume

- [ ] Make small cards editable instead of forcing deletion and recreation.

- [ ] Change the profile auto-save

- [ ] Create a standard for custom resume templates

