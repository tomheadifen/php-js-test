<?php

class TextDocument
{
	private $name;
	private $content;

	public function __construct($name, $content)
	{
		$this->name = $name;
		$this->content = $content;

		$this->outputTextFile();
	}

	public function outputTextFile()
	{
		$formattedName = $this->name . '.txt';

		//Create file if possible
		$file = fopen($formattedName, 'w') or die('Cannot open file:  ' . $formattedName);
		$formattedContent = $this->formatContent();
		fwrite($file, $formattedContent);
	}

	private function formatContent()
	{
		$tidiedContent = 'Serials for ' . $this->name;
		foreach ($this->content as $c) {
			$tidiedContent .=  PHP_EOL . $c->serial;
		}
		return $tidiedContent;
	}
}