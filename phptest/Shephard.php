<?php

include_once 'Animal.php';
include_once 'TextDocument.php';
include_once 'PrimeNumberGenerator.php';

class Shephard
{
	public $allGoats = [];
	public $allSheep = [];

	public function __construct()
	{
		$this->createAnimals();
		$this->saveAnimals();
	}

	private function createAnimals()
	{
		$serials = new PrimeNumberGenerator(10000, 100); 
		$this->createGoats($serials->randomPrimeNumbers);

		// Generate new primes for Sheep
		$serials->generate();
		$this->createSheep($serials->randomPrimeNumbers);
	}

	private function createGoats($serials)
	{
		foreach ($serials as $serial) {
			array_push($this->allGoats, new Goat($serial));
		}

	}

	private function createSheep($serials)
	{
		foreach ($serials as $serial) {
			array_push($this->allSheep, new Sheep($serial));
		}

	}

	public function saveAnimals()
	{
		new TextDocument('Goats', $this->allGoats);
		new TextDocument('Sheep', $this->allSheep);
		new TextDocument('Soul-Mates', $this->getSoulMates());
	}

	public function getSoulMates() {
		//Get serial numbers
		$soulMates = [];
		//Compare each goat to all the sheep to find common serials
		foreach ($this->allGoats as $goat) {
			foreach ($this->allSheep as $sheep) {
				if ($goat->serial === $sheep->serial) {
					//Push a standard object with the common serial so that we can easily create a document
					array_push($soulMates, (object) ['serial' => $goat->serial]);
				}
			}
		}
		return $soulMates;
	}
}