Title: Instagram Bulk Comment and Like Deletion Guide
Date: 2026-05-31 09:30
Category: Otomasyon
Tags: Instagram, JavaScript, Automation, Browser Console
Slug: instagram-toplu-yorum-ve-begeni-silme-rehberi
Authors: yuceltoluyag
Status: published
Summary: A practical JavaScript automation guide for the browser console that bypasses the Bloks UI barrier for those who want to clean up their Instagram history.
Template: article
Lang: en

Last night, after the kids were asleep, I was sipping my coffee at my desk ☕, rummaging through old archives. My eyes landed on the code for that famous Instagram bot I wrote years ago and a demo video I captured back then [^1]. At that time, Instagram's total user count was only about 2 million, and thanks to my bot, it personally touched 1.9 million of them 😂. The funny part is, back then, everyone using bots was getting banned left and right, while people curiously asked me: "Dude, how are you not getting banned when everyone else is?" 😎 I had taken the bot from Selenium and brought it to a level where it could run with UI Automator on mobile devices. 📱


<script async src="//www.instagram.com/embed.js"></script>

Years have passed, but Instagram's policy of tormenting users hasn't changed much. 🤦‍♂️ It's 2026, and on this massive platform, you can't perform any bulk actions properly; you have to delete and edit every interaction one by one. They treat us like occasional social media users with a few interactions tucked away. Trying to select and delete thousands of comments one by one in Instagram's own interface is like trying to empty the ocean with a spoon. 🥄🌊

There are browser extensions online that perform this bulk deletion task, and they sell them for prices around 20 euros. 💸 But in this guide, I'm giving you JavaScript code that does the same thing, for a price slightly more than free (meaning completely free), my friend 😂.

With this code, I managed to completely clean up my own account in almost 1 day. ✨ Instagram initially tried to scare me. When I used to attempt to clean my profile, it would block me for 1 day for "doing too many of the same thing," disrupting some basic account functions. 🚫 However, with this method, I've deleted tens of thousands of comments and likes without any issues so far, not even a single warning. The secret is keeping the number of items selected at once (the `MAX` value) at a maximum of 20 for deletion and unliking operations.

---

## 💡 Why Don't Standard Clicking Methods Work?

Instagram uses a dynamic structure called **Bloks** instead of classic HTML elements in its interface. This structure, for security reasons, ignores standard triggers like `element.click()` directly in JavaScript.

To overcome this issue, I designed a custom function called `realClick`. This function triggers `mousedown`, `mouseup`, and `click` pointer events sequentially with realistic timings to send a signal to the browser that "a human is actually clicking here." This allows us to automatically select elements without getting caught by the platform's security mechanisms.

---

## 🛠️ Preparation and Things to Note

Before running the script, we need to pay attention to these critical rules:

!!! warning
    **Language Setting Required:** The interface language of your Instagram account **must** be **English**. The scripts search for the texts "Select," "Delete," and "Unlike" in the buttons to function, so they won't find the buttons in the Turkish interface and will stop.

It is crucial to navigate to the relevant page based on the type of interaction you want to perform. Which tab you are on determines the accuracy of these codes:

*   **Likes Page:** [Likes](https://www.instagram.com/your_activity/interactions/likes){: target="_blank" rel="noopener noreferrer"}
*   **Comments Page:** [Comments](https://www.instagram.com/your_activity/interactions/comments){: target="_blank" rel="noopener noreferrer"}
*   **Reposts Page:** [Reposts](https://www.instagram.com/your_activity/interactions/reposts){: target="_blank" rel="noopener noreferrer"}
*   **Story Replies Page:** [Story Replies](https://www.instagram.com/your_activity/interactions/story_replies){: target="_blank" rel="noopener noreferrer"}
*   **Reviews Page:** [Reviews](https://www.instagram.com/your_activity/interactions/reviews){: target="_blank" rel="noopener noreferrer"} [^2]

1.  Open the Instagram web version from your computer and log in.
2.  Navigate to the appropriate page from the links above based on the type of interaction you want to delete.
3.  Right-click on your browser and select **Inspect** or open the developer console by pressing the `F12` key.

!!! tip
    **Console Paste Solution:** If your browser prevents you from pasting code into the console, type `allow pasting` in the console line and press Enter. Then, try pasting the script again.

---

## 📝 1. Deletion Script for Comments, Posts, Story Replies, and Reviews

The following script is used to bulk delete your comments, reposts, story replies, and reviews. Simply copy the code, paste it into the console, and press Enter.

```javascript
/**
 * Instagram Bulk Interaction Deletion Script
 * For Comments, Reposts, Story Replies, and Reviews.
 */
(async function instagramBulkDelete() {
  window.__STOP_IG_BULK_DELETE__ = false;

  // Keep the number of deletions per cycle low for your safety
  const MAX = 10; 
  const CYCLE_DELAY = 20000; // Delay between cycles (ms)
  const SELECT_DELAY = 1200;
  const ICON_DELAY = 700;
  const DELETE_DELAY = 1500;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Simulate a real click
  function realClick(element) {
    element.scrollIntoView({ block: "center" });

    ["mousedown", "mouseup", "click"].forEach((eventType) => {
      element.dispatchEvent(
        new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
    });
  }

  function findSelectButton() {
    return [
      ...document.querySelectorAll(
        'div[data-bloks-name="bk.components.Flexbox"]',
      ),
    ].find((el) => el.innerText?.trim() === "Select");
  }

  async function activateSelectMode() {
    const selectBtn = findSelectButton();
    if (!selectBtn) {
      throw new Error("Select button not found.");
    }
    realClick(selectBtn);
    await sleep(SELECT_DELAY);
  }

  function getSelectableIcons() {
    return document.querySelectorAll(
      'div[data-bloks-name="ig.components.Icon"][style*="circle__outline"]',
    );
  }

  async function selectItems(max) {
    const icons = getSelectableIcons();
    if (!icons.length) {
      return 0;
    }

    let selected = 0;
    for (const icon of icons) {
      if (selected >= max) break;

      icon.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(400);

      const button = icon.closest('[role="button"]');
      if (!button) continue;

      realClick(button);
      selected++;
      await sleep(ICON_DELAY);
    }
    return selected;
  }

  function findBloksDeleteButton() {
    const deleteText = [
      ...document.querySelectorAll(
        'span[data-bloks-name="bk.components.TextSpan"]',
      ),
    ].find((span) => span.innerText?.trim() === "Delete");

    if (!deleteText) return null;
    return deleteText.closest('div[style*="pointer-events: auto"]');
  }

  async function clickBloksDelete() {
    await sleep(SELECT_DELAY);
    const deleteBtn = findBloksDeleteButton();
    if (!deleteBtn) {
      throw new Error("Bloks Delete button not found.");
    }
    realClick(deleteBtn);
  }

  function findModalDeleteButton() {
    return [...document.querySelectorAll("button")].find(
      (btn) => btn.innerText?.trim() === "Delete",
    );
  }

  async function confirmFinalDelete() {
    await sleep(DELETE_DELAY);
    const modalDeleteBtn = findModalDeleteButton();
    if (!modalDeleteBtn) {
      throw new Error("Confirmation button not found.");
    }
    modalDeleteBtn.focus();
    await sleep(100);
    modalDeleteBtn.click();
  }

  let cycle = 1;
  while (!window.__STOP_IG_BULK_DELETE__) {
    try {
      await activateSelectMode();
      const deletedCount = await selectItems(MAX);

      if (!deletedCount) {
        console.log("No more interactions to delete.");
        break;
      }

      await clickBloksDelete();
      await confirmFinalDelete();

      console.log(`Cycle ${cycle}: ${deletedCount} items deleted.`);
      cycle++;

      await sleep(CYCLE_DELAY);
    } catch (error) {
      console.warn("Operation stopped:", error.message);
      break;
    }
  }
})();
```

---

## 🖤 2. Unlike Script for Likes

If you want to collectively unlike posts you've liked, the button naming structure changes. During my tests, I noticed the button names needed to be updated to "Unlike." You can use this code in the Likes tab:

```javascript
/**
 * Instagram Bulk Unlike Script
 * For the Likes tab only.
 */
(async function instagramBulkUnlike() {
  window.__STOP_IG_BULK_DELETE__ = false;

  const MAX = 20; 
  const CYCLE_DELAY = 20000; 
  const SELECT_DELAY = 1200;
  const ICON_DELAY = 700;
  const DELETE_DELAY = 1500;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function realClick(element) {
    element.scrollIntoView({ block: "center" });

    ["mousedown", "mouseup", "click"].forEach((eventType) => {
      element.dispatchEvent(
        new MouseEvent(eventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        }),
      );
    });
  }

  function findSelectButton() {
    return [
      ...document.querySelectorAll(
        'div[data-bloks-name="bk.components.Flexbox"]',
      ),
    ].find((el) => el.innerText?.trim() === "Select");
  }

  async function activateSelectMode() {
    const selectBtn = findSelectButton();
    if (!selectBtn) {
      throw new Error("Select button not found.");
    }
    realClick(selectBtn);
    await sleep(SELECT_DELAY);
  }

  function getSelectableIcons() {
    return document.querySelectorAll(
      'div[data-bloks-name="ig.components.Icon"][style*="circle__outline"]',
    );
  }

  async function selectItems(max) {
    const icons = getSelectableIcons();
    if (!icons.length) {
      return 0;
    }

    let selected = 0;
    for (const icon of icons) {
      if (selected >= max) break;

      icon.scrollIntoView({ behavior: "smooth", block: "center" });
      await sleep(400);

      const button = icon.closest('[role="button"]');
      if (!button) continue;

      realClick(button);
      selected++;
      await sleep(ICON_DELAY);
    }
    return selected;
  }

  function findBloksDeleteButton() {
    const unlikeText = [
      ...document.querySelectorAll(
        'span[data-bloks-name="bk.components.TextSpan"]',
      ),
    ].find((span) => span.innerText?.trim() === "Unlike");

    if (!unlikeText) return null;
    return unlikeText.closest('div[style*="pointer-events: auto"]');
  }

  async function clickBloksUnlike() {
    await sleep(SELECT_DELAY);
    const unlikeBtn = findBloksDeleteButton();
    if (!unlikeBtn) {
      throw new Error("Bloks Unlike button not found.");
    }
    realClick(unlikeBtn);
  }

  function findModalDeleteButton() {
    return [...document.querySelectorAll("button")].find(
      (btn) => btn.innerText?.trim() === "Unlike",
    );
  }

  async function confirmFinalUnlike() {
    await sleep(DELETE_DELAY);
    const modalUnlikeBtn = findModalDeleteButton();
    if (!modalUnlikeBtn) {
      throw new Error("Confirmation button not found.");
    }
    modalUnlikeBtn.focus();
    await sleep(100);
    modalUnlikeBtn.click();
  }

  let cycle = 1;
  while (!window.__STOP_IG_BULK_DELETE__) {
    try {
      await activateSelectMode();
      const unlikedCount = await selectItems(MAX);

      if (!unlikedCount) {
        console.log("No more likes to unlike.");
        break;
      }

      await clickBloksUnlike();
      await confirmFinalUnlike();

      console.log(`Cycle ${cycle}: ${unlikedCount} likes unliked.`);
      cycle++;

      await sleep(CYCLE_DELAY);
    } catch (error) {
      console.warn("Operation stopped:", error.message);
      break;
    }
  }
})();
```

---

## 🛠️ Potential Issues and Solutions

*   **Instagram Action Limit:** Instagram might impose temporary action limits while the script is running. In this case, you'll start seeing request errors in the console. To resolve this, increase the `CYCLE_DELAY` value in the code to `30000` (30 seconds) or higher, and keep the `MAX` value at a low level, like `5`. If you've been hit with a limit, take a break for at least 8 hours. If the limit persists after 8 hours, you might need to wait for 24 hours for your account to fully recover.
*   **Button Not Found Error:** The page might not have fully loaded yet, or your language setting is not English. Refresh the page, ensure the language is set to English, and then run the code again.
*   **I Want to Stop the Script:** You can paste and run the following code in the console. Alternatively, if you don't want to mess with the code at all, you can stop the script instantly by refreshing the browser page (press F5).
    ```javascript
    window.__STOP_IG_BULK_DELETE__ = true;
    ```

If you're experiencing an annoying visual issue with the keyboard on the mobile app, you can also check out my previously prepared guide: [What to Do If the Keyboard Covers the Comment Box in Instagram](/en/instagram-klavye-yorum-kutusu-sorunu/).

If you also want to clean up your past, my friend, you can get rid of this hassle effortlessly by running the scripts above in your browser console. Don't forget to share your experiences in the comments!

[^1]: Those curious about the old demo video I mentioned can check out my [Instagram post](https://www.instagram.com/p/CEOCOVTjnLo/){: target="_blank" rel="noopener noreferrer"}.
[^2]: You can also access all interaction pages from the "Your activity" panel in the left menu on the Instagram web version.