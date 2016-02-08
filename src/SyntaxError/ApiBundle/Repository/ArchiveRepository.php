<?php

namespace SyntaxError\ApiBundle\Repository;

use Doctrine\ORM\EntityRepository;
use SyntaxError\ApiBundle\Tools\Uniter;
use SyntaxError\ApiBundle\Entity\Archive;

/**
 * archiveRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ArchiveRepository extends EntityRepository
{
    /**
     * @return null|Archive
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findLast()
    {
        return $this->getEntityManager()->getRepository("SyntaxErrorApiBundle:Archive")->createQueryBuilder('a')
            ->orderBy('a.dateTime', 'desc')->setMaxResults(1)->getQuery()->getOneOrNullResult();
    }

    /**
     * @param $archiveProperty
     * @return float|int
     */
    public function getLastTrend($archiveProperty)
    {
        $archives = $this->getEntityManager()->getRepository("SyntaxErrorApiBundle:Archive")->createQueryBuilder('a')
            ->select("a.$archiveProperty")->orderBy('a.dateTime', 'desc')->setMaxResults(24)->getQuery()->getResult();
        if(!$archives) return 0;
        return Uniter::getTrend($archives, $archiveProperty);
    }

    /**
     * @param \DateTime $dateTime
     * @return array|Archive[]
     */
    public function findByDay(\DateTime $dateTime)
    {
        $from = new \DateTime($dateTime->format("Y-m-d H:i:s"));
        $to = new \DateTime($dateTime->format("Y-m-d H:i:s"));
        $from->setTime(0,0,0);
        $to->setTime(23,59,59);
        return $this->getEntityManager()->getRepository("SyntaxErrorApiBundle:Archive")
            ->createQueryBuilder('a')
            ->where('a.dateTime BETWEEN :from AND :to')
            ->setParameter( 'from', $from->getTimestamp() )
            ->setParameter( 'to', $to->getTimestamp() )
            ->getQuery()->getResult();
    }

    /**
     * @param \DateTime $any
     * @return null|Archive
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findProximate(\DateTime $any)
    {
        return $this->getEntityManager()->getRepository("SyntaxErrorApiBundle:Archive")->createQueryBuilder('a')
            ->where('a.dateTime <= :any_unix')->setParameter('any_unix', $any->getTimestamp())
            ->orderBy('a.dateTime', 'desc')->setMaxResults(1)->getQuery()->getOneOrNullResult();
    }

    /**
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getBatteryStatus()
    {
        return $this->createQueryBuilder('a')->select('a.windBatteryStatus, a.rainBatteryStatus, a.outTempBatteryStatus, a.inTempBatteryStatus')
            ->orderBy('a.dateTime', 'desc')->setMaxResults(1)->getQuery()->getOneOrNullResult();
    }
}
