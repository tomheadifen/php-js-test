<?php

class PrimeNumberGenerator
{
	public $randomPrimeNumbers;
	private $maxPrime;
	private $numberOfPrimes;
	
	public function __construct($maxPrime, $numberOfPrimes)
	{
		$this->maxPrime = $maxPrime;
		$this->numberOfPrimes = $numberOfPrimes;

		$this->generate();
	}

	/**
	 * Generate an array of random prime numbers to a maximum value
	 * @return [void]
	 */
	public function generate()
	{
		$allNumbers = $this->getFilteredArray(range(0 , $this->maxPrime));
		$this->randomPrimeNumbers = array_rand($allNumbers, 100);
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

	/**
	 * Gets one of the prime numbers and also removes it from all the generated primes
	 * @return [number] [a prime]
	 */
	public function getRandGeneratedPrime()
	{
		$randomPrime = array_rand($this->generate())[0];
		return $randomPrime; 
	}
}