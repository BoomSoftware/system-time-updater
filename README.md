# system-time-updater

Updates system time using a given timestamp. Depending on the platform, it requires appropriate permissions. Both timestamps with and without milliseconds are valid.

<br>

## Instalation
```
npm i system-time-updater
```
<br>

## Example
```ts
import { updateSystemDatetime } from 'system-time-updater';

//Linux and Windows
await updateSystemDatetime(1636541818000);

//On Linux you can add optional `sudo` to execute command
await updateSystemDatetime(1636541818000, {
    sudo: true,
});

```