-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generato il: Ago 22, 2015 alle 15:22
-- Versione del server: 5.5.45-MariaDB
-- Versione PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bit_tabletop`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `idManufacturer` int(11) NOT NULL COMMENT 'casa produttrice',
  `nMinPlayer` int(11) NOT NULL,
  `nMaxPlayer` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `releaseDate` date NOT NULL,
  `description` varchar(2048) NOT NULL,
  `contents` varchar(2048) NOT NULL COMMENT 'contenuto della confezione',
  `isExpansion` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'true se si tratta di una espansione false altrimenti',
  `minAge` int(11) NOT NULL,
  `maxAge` int(11) NOT NULL,
  `ean` varchar(250) NOT NULL COMMENT 'European Article Number',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ean` (`ean`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `gamesTypo`
--

CREATE TABLE IF NOT EXISTS `gamesTypo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGames` int(11) NOT NULL,
  `idTypology` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `library`
--

CREATE TABLE IF NOT EXISTS `library` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idGames` int(11) NOT NULL,
  `isDesire` tinyint(1) NOT NULL DEFAULT '0',
  `bought` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idRating` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `manufacturer`
--

CREATE TABLE IF NOT EXISTS `manufacturer` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `description` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `picture`
--

CREATE TABLE IF NOT EXISTS `picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `picture` varchar(250) NOT NULL,
  `title` varchar(250) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idGames` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `rating`
--

CREATE TABLE IF NOT EXISTS `rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idGames` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `complexity` int(11) NOT NULL,
  `review` int(11) NOT NULL COMMENT 'numero tra 1 e 10',
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `typology`
--

CREATE TABLE IF NOT EXISTS `typology` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `typology` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `typology` (`typology`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `pswd` varchar(250) NOT NULL,
  `avatar` varchar(250) NOT NULL DEFAULT 'css/img/user.png',
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
