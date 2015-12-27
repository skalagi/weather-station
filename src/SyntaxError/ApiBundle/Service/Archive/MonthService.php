<?php

namespace SyntaxError\ApiBundle\Service\Archive;

use Doctrine\ORM\EntityManager;
use SyntaxError\ApiBundle\Entity\ArchiveDayOuttemp;
use SyntaxError\ApiBundle\Entity\ArchiveDayWindgustdir;
use SyntaxError\ApiBundle\Interfaces\ArchiveDay;
use SyntaxError\ApiBundle\Interfaces\ArchiveService;
use SyntaxError\ApiBundle\Tools\RecordBuilder;

class MonthService implements ArchiveService
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function highFormatter(\DateTime $dateTime, $archiveName)
    {
        $from = (new \DateTime( $dateTime->format("Y-m-01 00:00:00") ));
        $to = (new \DateTime( $dateTime->format("Y-m-t 23:59:59") ));

        /** @noinspection PhpUndefinedMethodInspection */
        $records = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDay$archiveName")->findBetween($from, $to);
        $output = [];

        switch($archiveName) {
            case 'Windgustdir':
                foreach($records as $i => $record) {
                    if($record instanceof ArchiveDay) {
                        if( (new \DateTime())->setTimestamp( $record->getDatetime() )->format("H") != 0) continue;
                        $cnt = $record->getCount();
                        $output[] = [($record->getDatetime()+3600)*1000, $cnt ? $record->getSum() / $cnt : 0];
                    }
                } break;

            case 'Rain':
                foreach($records as $i => $record) {
                    if($record instanceof ArchiveDay) {
                        if( (new \DateTime())->setTimestamp( $record->getDatetime() )->format("H") != 0) continue;
                        $output[] = [($record->getDatetime()+3600)*1000, $record->getSum()];
                    }
                } break;

            default:
                foreach($records as $i => $record) {
                    if($record instanceof ArchiveDay) {
                        if( (new \DateTime())->setTimestamp( $record->getDatetime() )->format("H") != 0) continue;
                        $output[] = [($record->getDatetime()+3600)*1000, $record->getMin(), $record->getMax()];
                    }
                } break;
        }

        return $output;
    }

    public function createTemperature(\DateTime $dateTime)
    {
        $max = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayOuttemp")->findMonthRecord($dateTime);
        $min = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayOuttemp")->findMonthRecord($dateTime, false);
        if(!$max || !$min) return "Empty record.";
        $builder = new RecordBuilder();
        $builder->set( 'max', $max->getMaxtime(), $max->getMax() );
        $builder->set( 'min', $min->getMintime(), $min->getMin() );
        return $builder->getTemperatureRecord();
    }

    public function createHumidity(\DateTime $dateTime)
    {
        $max = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayOuthumidity")->findMonthRecord($dateTime);
        $min = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayOuthumidity")->findMonthRecord($dateTime, false);
        if(!$max || !$min) return "Empty record.";
        $builder = new RecordBuilder();
        $builder->set( 'max', $max->getMaxtime(), $max->getMax() );
        $builder->set( 'min', $min->getMintime(), $min->getMin() );
        return $builder->getHumidityRecord();
    }

    public function createBarometer(\DateTime $dateTime)
    {
        $max = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayBarometer")->findMonthRecord($dateTime);
        $min = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayBarometer")->findMonthRecord($dateTime, false);
        if(!$max || !$min) return "Empty record.";
        $builder = new RecordBuilder();
        $builder->set( 'max', $max->getMaxtime(), $max->getMax() );
        $builder->set( 'min', $min->getMintime(), $min->getMin() );
        return $builder->getBarometerRecord();
    }

    public function createWindSpeed(\DateTime $dateTime)
    {
        $max = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayWindgust")->findMonthRecord($dateTime);
        if(!$max) return "Empty record.";
        $builder = new RecordBuilder();
        $builder->set( 'max', $max->getMaxtime(), $max->getMax() );
        return $builder->getWindSpeedRecord();
    }

    public function createWindDir(\DateTime $dateTime)
    {
        $avg = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayWindgustdir")->avgMonth($dateTime);
        $builder = new RecordBuilder();
        $builder->set( 'avg', "Średni kierunek wiatru", $avg);
        return $builder->getWindDirAvg();
    }

    public function createRain(\DateTime $dateTime)
    {
        $sum = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayRain")->findMonthSum($dateTime);
        $builder = new RecordBuilder();
        $builder->set( 'sum', "Suma opadów", $sum);
        return $builder->getRainRecord();
    }

    public function createRainRate(\DateTime $dateTime)
    {
        $max = $this->em->getRepository("SyntaxErrorApiBundle:ArchiveDayRainrate")->findMonthRecord($dateTime);
        if(!$max) return "Empty record.";
        $builder = new RecordBuilder();
        $builder->set( 'max', $max->getMaxtime(), $max->getMax());
       return $builder->getRainRateRecord();
    }

}
