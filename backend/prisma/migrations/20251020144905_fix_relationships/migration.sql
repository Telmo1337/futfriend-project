-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `playersgame` DROP FOREIGN KEY `PlayersGame_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `playersgame` DROP FOREIGN KEY `PlayersGame_userId_fkey`;

-- DropIndex
DROP INDEX `Game_createdById_fkey` ON `game`;

-- DropIndex
DROP INDEX `PlayersGame_gameId_fkey` ON `playersgame`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayersGame` ADD CONSTRAINT `PlayersGame_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayersGame` ADD CONSTRAINT `PlayersGame_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
