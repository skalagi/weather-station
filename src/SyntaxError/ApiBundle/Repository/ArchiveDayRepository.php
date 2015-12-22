<?php

namespace SyntaxError\ApiBundle\Repository;

use Doctrine\ORM\EntityRepository;
use SyntaxError\ApiBundle\Interfaces\ArchiveDay;

class ArchiveDayRepository extends EntityRepository
{
    /**
     * @param \DateTime $dateTime
     * @param $max
     * @return null|ArchiveDay
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findMonthRecord(\DateTime $dateTime, $max = true)
    {
        $from = (new \DateTime( $dateTime->format('Y-m-01 00:00:00') ))->getTimestamp();
        $to = (new \DateTime( $dateTime->format('Y-m-t 23:59:59') ))->getTimestamp();
        return $this->createQueryBuilder('a')
            ->where('a.datetime BETWEEN :from AND :to')
            ->setParameter('from', $from)->setParameter('to', $to)
            ->orderBy('a.'.( $max ? 'max' : 'min'), $max ? 'desc' : 'asc')
            ->setMaxResults(1)->getQuery()->getOneOrNullResult();
    }

    /**
     * @param \DateTime $dateTime
     * @param bool|true $max
     * @return null|ArchiveDay
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findYearRecord(\DateTime $dateTime, $max = true)
    {
        $from = (new \DateTime( $dateTime->format('Y-01-01 00:00:00') ))->getTimestamp();
        $to = (new \DateTime( $dateTime->format('Y-12-31 23:59:59') ))->getTimestamp();
        return $this->createQueryBuilder('a')
            ->where('a.datetime BETWEEN :from AND :to')
            ->setParameter('from', $from)->setParameter('to', $to)
            ->orderBy('a.'.( $max ? 'max' : 'min'), $max ? 'desc' : 'asc')
            ->setMaxResults(1)->getQuery()->getOneOrNullResult();
    }
}