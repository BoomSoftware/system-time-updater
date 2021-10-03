import { updateSystemDatetime } from './time-updater';

export * from './time-updater'

updateSystemDatetime(1636541818000, {
    sudo: true,
});