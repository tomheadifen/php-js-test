<?php

class Animal
{
	public $sound;
	public function __construct($serial)
	{
		$this->serial = $serial;
	}
}

class Goat extends Animal
{
	public $sound = 'bleeehh';
	public $baby = 'kid';
}

class Sheep extends Animal
{
	public $sound = 'baaaa';
	public $baby = 'lamb';
}