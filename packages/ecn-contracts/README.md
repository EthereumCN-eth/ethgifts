## Express SBT test

express version 2

```js
initial check
✔ check initial setting

simple mint 3 level SBT
✔ check status after mint (61ms)
✔ mint: mint all levels in order (132ms)
✔ mint: mint level 3, and then mint level 2, at last mint level 1 (119ms)
✔ mint: mint arbitrary level SBT after another account mint (112ms)
✔ mint: mint level 1, level 3, and then mint level 2 with level 2 signature (107ms)
✔ revert: not enough express counters to mint SBT level
✔ revert: mint the same level at twice (57ms)
✔ revert: mint level 1, 3, then mint level 3 again (96ms)

admin functions
✔ add more level and then mint the latest level SBT (60ms)

10 passing (3s)
```
