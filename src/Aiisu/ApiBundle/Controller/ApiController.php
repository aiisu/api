<?php

namespace Aiisu\ApiBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\View\View;

class ApiController extends Controller
{
    /**
     * @Rest\Get("/")
     */
    public function julius_getAction(Request $request)
    {
        $data = ['hello' => 'world'];
        $view = new View($data, Response::HTTP_OK);

        return $view;
    }
    /**
     * @Rest\Post("/")
     */
    public function julius_postAction(Request $request)
    {
        $key= $request->query->get('key',false);

        if($key == false ){
            return new View(array("err"=>"key not found"),Response::HTTP_NOT_ACCEPTABLE);
        }elseif ($key !== "1234"){
            return new View(array("err"=>"key Wrong"),Response::HTTP_NOT_ACCEPTABLE);
        }
        $numIn = $request->query->get('number',false);
        if (is_numeric($numIn)){
            $num = $numIn;
        }else{
            $num = 1;
        }
        $isNeedphone = $request->query->get('np',false);
        if ($isNeedphone == "true"){
            $needPhone = true;
        }else{
            $needPhone = false;
        }
        $pathConfig = "/home/kabocha/dic/main.jconf -C /home/kabocha/dic/am-gmm.jconf";
        $pathList = "/home/kabocha/list.txt";
        $numOutput = vsprintf("-output %s",array($num));
        $doJulius = vsprintf("julius -C %s -input file -filelist %s %s",array($pathConfig,$pathList,$numOutput));

        $data = $request->getContent();
        if (file_exists("/home/kabocha/asr.wav")){
            unlink("/home/kabocha/asr.wav");
        }
        file_put_contents("/home/kabocha/asr.wav",$data);
        exec($doJulius,$asrOut);

        $startIndex = array_search("### Recognition: 1st pass (LR beam)",$asrOut);

        if ($startIndex == false){
            return new View($asrOut,Response::HTTP_NOT_ACCEPTABLE);
        }
        $outData = array(
            "usr"=>"test",
            "best"=>array(),
            "result"=>array()
        );
        for ($i = $startIndex ;$i <$startIndex+10 ;$i++){
            if (strstr($asrOut[$i],"pass1_best:")){
                $tmpWord = substr(strstr($asrOut[$i],":"),1);
                $tmpWordseq = substr(strstr($asrOut[$i+1],":"),1);
                if ($needPhone){
                    $tmpPhone = substr(strstr($asrOut[$i+2],":"),1);
                }else{
                    $tmpPhone = null;
                }
                $tmpScore = substr(strstr($asrOut[$i+3],":"),1);
                $tmpResult = array(
                    "result"=> $tmpWord,
                    "seq"=>$tmpWordseq,
                    "phone"=>$tmpPhone,
                    "score"=>$tmpScore
                );
                array_push($outData["best"],$tmpResult);
            }
        }


        $startIndex = array_search("### Recognition: 2nd pass (RL heuristic best-first)",$asrOut);
        $arrLength = sizeof($asrOut);

        for ($i = $startIndex ;$i < $arrLength;$i++){
               if (strstr($asrOut[$i],"sentence")){
                    $tmpWord = substr(strstr($asrOut[$i],":"),1);
                    $tmpWordseq = substr(strstr($asrOut[$i+1],":"),1);
                    if ($needPhone){
                        $tmpPhone = substr(strstr($asrOut[$i+2],":"),1);
                    }else{
                        $tmpPhone = null;
                    }
                    $tmpCmscore = substr(strstr($asrOut[$i+3],":"),1);
                    $tmpScore = substr(strstr($asrOut[$i+4],":"),1);
                    $tmpResult = array(
                        "result"=> $tmpWord,
                        "seq"=>$tmpWordseq,
                        "phone"=>$tmpPhone,
                        "cmscore"=>$tmpCmscore,
                        "score"=>$tmpScore
                    );
                    array_push($outData["result"],$tmpResult);
                }
      }

	return new View($outData,Response::HTTP_OK);
    }
}
