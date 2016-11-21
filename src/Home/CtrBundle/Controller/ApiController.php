<?php

namespace Home\CtrBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;

class ApiController extends FOSRestController
{
    /**
     * @Rest\Get("/")
     */
    public function home_getAction(Request $request)
    {
        $data = ['Readme' => 'This is HMC api'];
        $view = $this->view($data, Response::HTTP_OK);
        return $view;
    }


    /**
     * @Rest\Post("/")
     */
    public function home_postAction(Request $request)
    {
        $key= $request->query->get('key',false);
        if($key == false ){
            return array("err"=>"key not found");
        }elseif ($key !== "kas3rad" & $key !== "ha52fd"){
            return array("err"=>"key wrong");
        }
        if ($key == "kas3rad"){
            $usr = "kabocha";
        }elseif ($key == "ha52fd"){
            $usr = "haruka";
        }else{
            return array("err"=>"wrong key");
        }
        $todo = $request->get('todo');
        $device = $request->get('device');
        if ($todo == false){
            return array("err"=>"todo not found");
        }elseif ($device == false){
            return array("err"=>"device not found");
        }

        $url = 'http://192.168.1.165/control/api';
        $data  = array(
            'dv'=>$device,
            'td'=>$todo,
            'usr'=>$usr
        );
        $opt = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context = stream_context_create($opt);
	return file_get_contents($url,false,$context);
    }
}
