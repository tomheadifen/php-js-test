<?php

test();

function test() {
	$x = new PrimeNumberGenerator();
	print_r($x->getPrimeNumbers(10000));
}


class Animal {

}

class Goat extends Animal {

}

class Sheep extends Animal {
	
}

class PrimeNumberGenerator {
	public $randomPrimenumbers = [];
	
	public function __construct() {
		// $this->$randomPrimenumbers = $this->generatePrimeNumbers(10000, 100);
	}

	/**
	 * Generate an array of random prime numbers to a maximum value
	 * @param  [number] $maxPrime [When to stop generating prime numbers]
	 * @param  [number] $numberOfPrimes [How many prime numbers you want]
	 * @return [array]                      [An array of random prime numbers]
	 */
	public function generatePrimeNumbers($maxPrime, $numberOfPrimes) {
		$primeNumbers = $this->getPrimeNumbers($maxPrime);

	}

	/**
	 * Returns an array of all the prime numbers to a maximum value
	 * @param  [type] $maxPrime [description]
	 * @return [type]                      [description]
	 */
	public function getPrimeNumbers($maxPrime = 10000)
	{
		$allNumbers = $this->getFilteredArray(range(1 , $maxPrime));
		return array_rand($allNumbers, 100);  
	}

	/**
	 * Filter out non primes from the given array
	 * Uses the Sieve of Eratosthenes algorithm
	 * http://www.algorithmist.com/index.php/Prime_Sieve_of_Eratosthenes
	 * @param  [array] $allNumbers	[]
	 * @return [array]             [array of primes]
	 */
	private function getFilteredArray($allNumbers)
	{
		// Remove numbers less than 2
		$allNumbers = array_filter($allNumbers, function($num) {
			return $num > 1;
		});

		$lastNumber = array_values(array_slice($allNumbers, -1))[0];

		//Algorithm Start
		foreach ($allNumbers as $num) {
			$numberToRemove = $num*$num; 
			// Stop when we get to the end of $allNumbers
			while($numberToRemove <= $lastNumber) {
				//Unset the value, note that this will also alter the $allNumbers array.
				unset($allNumbers[array_search($numberToRemove, $allNumbers)]);
				$numberToRemove += $num; 
			}
		}
		return $allNumbers;
	}
}