<?php

namespace Home\CtrBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    /**
     * @Rest\Get("/")
     */
    public function indexAction(Request $request)
    {
        $data = ['Readme' => 'This is HMC api'];
        $view = new View($data, Response::HTTP_OK);
        return $view;
    }

}
