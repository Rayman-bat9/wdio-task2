const { expect, browser, $ } = require('@wdio/globals')

describe('Create new paste on pastebin', () => {
    it('should open pastebin and check title', async () => {
        await browser.url(`https://pastebin.com`)
        const pageTitle = await browser.getTitle();

        expect(pageTitle).toEqual('Pastebin.com - #1 paste tool since 2002!');
    })

    it('should create a new paste', async () => {
        await $('#postform-text').setValue('git config --global user.name  "New Sheriff in Town" \ngit reset $(git commit-tree HEAD^{tree} -m "Legacy code") \ngit push origin master --force')
        await $('#select2-postform-format-container').click()
        await $('//li[contains(text(), "Bash")]').click()
        await $('#select2-postform-expiration-container').click()
        await $('//li[contains(text(), "10 Minutes")]').click()
        await $('#postform-name').setValue('how to gain dominance among developers')
        await $('button[type="submit"]').click()

        await browser.waitUntil(() => {
            return browser.getTitle() === 'how to gain dominance among developers - Pastebin.com'; // Wait until the page title matches the paste name
        }, {
            timeout: 10000,
            timeoutMsg: 'Page did not load after creating paste'
        });

        await expect('.bash').toBeExisting();
        const commands = [
            'git config --global user.name "New Sheriff in Town"',
            'git reset $(git commit-tree HEAD^{tree} -m "Legacy code")',
            'git push origin master --force'
        ];

        for (const command of commands) {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${command}, Error: ${error.message}`);
                    return;
                }
                console.log(`Successfully executed command: ${command}`);
            });
        }

    })
})

