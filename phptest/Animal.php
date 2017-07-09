<?php

class Animal
{
	public function __construct($serial)
	{
		$this->serial = $serial;
	}
	public $serial;
}

class Goat extends Animal
{
}

class Sheep extends Animal
{
	
}