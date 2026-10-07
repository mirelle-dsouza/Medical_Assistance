-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2026 at 06:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical_assistance`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `BookAppointment` (IN `p_patient_id` INT, IN `p_doctor_id` INT, IN `p_slot_id` INT)   BEGIN
    DECLARE v_receipt VARCHAR(20);
    SET v_receipt = CONCAT('RCPT', LPAD(FLOOR(RAND()*100000), 5, '0'));

    INSERT INTO Appointment (patient_id, doctor_id, slot_id, status, receipt_number)
    VALUES (p_patient_id, p_doctor_id, p_slot_id, 'Booked', v_receipt);

    UPDATE Doctor_TimeSlot SET is_available = FALSE WHERE slot_id = p_slot_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `slot_id` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Booked',
  `receipt_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `patient_id`, `doctor_id`, `slot_id`, `status`, `receipt_number`) VALUES
(1, 1, 3, 4, 'Booked', 'REC1791380602686'),
(2, 1, 3, 10, 'Booked', 'REC1791383611389'),
(3, 1, 3, 6, 'Booked', 'REC1791384780900'),
(4, 3, 1, 1, 'Booked', 'REC1791386045603');

--
-- Triggers `appointment`
--
DELIMITER $$
CREATE TRIGGER `after_appointment_cancel` AFTER UPDATE ON `appointment` FOR EACH ROW BEGIN
    IF NEW.status = 'Cancelled' AND OLD.status != 'Cancelled' THEN
        UPDATE Doctor_TimeSlot SET is_available = TRUE WHERE slot_id = NEW.slot_id;
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_appointment_insert` BEFORE INSERT ON `appointment` FOR EACH ROW BEGIN
    DECLARE v_available BOOLEAN;
    SELECT is_available INTO v_available FROM Doctor_TimeSlot WHERE slot_id = NEW.slot_id;
    IF v_available = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This time slot is already booked';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `login_id` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `specialization_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `name`, `login_id`, `password`, `specialization_id`) VALUES
(1, 'Dr. Ananya Rao', 'ananya', 'ananya123', 1),
(2, 'Dr. Aarav Mehta', 'aarav', 'aarav123', 2),
(3, 'Dr. Meera Nair', 'meera', 'meera123', 3),
(4, 'Dr. Rohan Shah', 'rohan', 'rohan123', 4),
(5, 'Dr. Kavya Desai', 'kavya', 'kavya123', 5),
(6, 'Dr. Arjun Kapoor', 'arjun', 'arjun123', 6),
(7, 'Dr. Ishaan Malhotra', 'ishaan', 'ishaan123', 7),
(8, 'Dr. Neha Iyer', 'neha', 'neha123', 8),
(9, 'Dr. Karan Patel', 'karan', 'karan123', 9),
(10, 'Dr. Diya Sharma', 'diya', 'diya123', 10);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_timeslot`
--

CREATE TABLE `doctor_timeslot` (
  `slot_id` int(11) NOT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `slot_time` varchar(20) DEFAULT NULL,
  `slot_date` date DEFAULT NULL,
  `is_available` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_timeslot`
--

INSERT INTO `doctor_timeslot` (`slot_id`, `doctor_id`, `slot_time`, `slot_date`, `is_available`) VALUES
(1, 1, '10:00 AM', '2026-10-07', 0),
(2, 1, '11:00 AM', '2026-10-07', 1),
(3, 2, '10:30 AM', '2026-10-07', 1),
(4, 3, '09:00 AM', '2026-10-07', 0),
(5, 7, '12:00 PM', '2026-10-07', 1),
(6, 3, '11:00 AM', '2026-10-08', 0),
(7, 3, '12:00 PM', '2026-10-08', 1),
(8, 3, '01:00 PM', '2026-10-08', 1),
(9, 3, '11:00 AM', '2026-10-09', 1),
(10, 3, '12:00 PM', '2026-10-09', 0);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `patient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `login_id` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `family_name` varchar(100) DEFAULT NULL,
  `family_phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`patient_id`, `name`, `login_id`, `password`, `email`, `phone`, `family_name`, `family_phone`) VALUES
(1, 'Aarohi', 'aarohi', 'aarohi123', 'aarohi@email.com', '9876543210', 'Ravi Sharma', '9876500001'),
(2, 'Riya', 'riya', 'riya123', 'riya@email.com', '9876543211', 'Sunil Verma', '9876500002'),
(3, 'Mirelle Dsouza', '202501031', '12345678', 'm@gmail.com', '1234567890', 'shreya', '1236547890');

-- --------------------------------------------------------

--
-- Table structure for table `specialization`
--

CREATE TABLE `specialization` (
  `specialization_id` int(11) NOT NULL,
  `department` varchar(50) NOT NULL,
  `specialization_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialization`
--

INSERT INTO `specialization` (`specialization_id`, `department`, `specialization_name`) VALUES
(1, 'General Medicine', 'General Physician'),
(2, 'Neurology', 'Neurologist'),
(3, 'Gastroenterology', 'Gastroenterologist'),
(4, 'Pulmonology', 'Pulmonologist'),
(5, 'Pediatrics', 'Pediatrician'),
(6, 'Dermatology', 'Dermatologist'),
(7, 'Cardiology', 'Cardiologist'),
(8, 'ENT', 'ENT Specialist'),
(9, 'Orthopedics', 'Orthopedic Specialist'),
(10, 'Gynecology', 'Gynecologist');

-- --------------------------------------------------------

--
-- Table structure for table `symptom`
--

CREATE TABLE `symptom` (
  `symptom_id` int(11) NOT NULL,
  `symptom_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `symptom`
--

INSERT INTO `symptom` (`symptom_id`, `symptom_name`) VALUES
(4, 'Cold'),
(3, 'Cough'),
(2, 'Fever'),
(1, 'Headache'),
(7, 'None of these'),
(5, 'Stomach Pain'),
(6, 'Vomiting');

-- --------------------------------------------------------

--
-- Table structure for table `symptom_specialization`
--

CREATE TABLE `symptom_specialization` (
  `symptom_id` int(11) NOT NULL,
  `specialization_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `symptom_specialization`
--

INSERT INTO `symptom_specialization` (`symptom_id`, `specialization_id`) VALUES
(1, 2),
(2, 1),
(3, 1),
(4, 8),
(5, 3),
(6, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD UNIQUE KEY `receipt_number` (`receipt_number`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `slot_id` (`slot_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD UNIQUE KEY `login_id` (`login_id`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- Indexes for table `doctor_timeslot`
--
ALTER TABLE `doctor_timeslot`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`patient_id`),
  ADD UNIQUE KEY `login_id` (`login_id`);

--
-- Indexes for table `specialization`
--
ALTER TABLE `specialization`
  ADD PRIMARY KEY (`specialization_id`),
  ADD UNIQUE KEY `specialization_name` (`specialization_name`);

--
-- Indexes for table `symptom`
--
ALTER TABLE `symptom`
  ADD PRIMARY KEY (`symptom_id`),
  ADD UNIQUE KEY `symptom_name` (`symptom_name`);

--
-- Indexes for table `symptom_specialization`
--
ALTER TABLE `symptom_specialization`
  ADD PRIMARY KEY (`symptom_id`,`specialization_id`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `doctor_timeslot`
--
ALTER TABLE `doctor_timeslot`
  MODIFY `slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `specialization`
--
ALTER TABLE `specialization`
  MODIFY `specialization_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `symptom`
--
ALTER TABLE `symptom`
  MODIFY `symptom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`slot_id`) REFERENCES `doctor_timeslot` (`slot_id`);

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`specialization_id`);

--
-- Constraints for table `doctor_timeslot`
--
ALTER TABLE `doctor_timeslot`
  ADD CONSTRAINT `doctor_timeslot_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);

--
-- Constraints for table `symptom_specialization`
--
ALTER TABLE `symptom_specialization`
  ADD CONSTRAINT `symptom_specialization_ibfk_1` FOREIGN KEY (`symptom_id`) REFERENCES `symptom` (`symptom_id`),
  ADD CONSTRAINT `symptom_specialization_ibfk_2` FOREIGN KEY (`specialization_id`) REFERENCES `specialization` (`specialization_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
