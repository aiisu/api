<?php

namespace Aiisu\ApiBundle\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('@ApiBundle/Resources/views/Default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/{usrname}", name="usrshow")
     */
    public function showResultAction($usrname)
    {

        return $this->render('@ApiBundle/Resources/views/Default/index.html.twig',[
                'name' => $usrname
        ]);

    }

}
