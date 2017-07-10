<?php

/**
 * run 'php start.php' in the console to run
 */

include_once 'Shephard.php';
include_once 'Animal.php';


$shephard = new Shephard();
echo " Sum of Goats Serial \n";
echo $shephard->getTotalOfSerial($shephard->allGoats);
echo "\n Range of Sheep \n";
echo $shephard->getRangeOfSerial($shephard->allSheep);
echo "\n Number of Soul Mates\n";
echo count($shephard->getSoulMates());
