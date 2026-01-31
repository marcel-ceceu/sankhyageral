<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="UTF-8"  isELIgnored ="false"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="java.util.*" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib prefix="snk" uri="/WEB-INF/tld/sankhyaUtil.tld" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="br.com.sankhya.modelcore.auth.AuthenticationInfo" %>
<%
    String idUsuario = ((AuthenticationInfo) session.getAttribute("usuarioLogado")).getUserID().toString();
%>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Primeiro Nivel Teste</title>


    <!-- Bootstrap core CSS -->
    <link href="${BASE_FOLDER}/assets/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="${BASE_FOLDER}/assets/css/style.css" rel="stylesheet">

    <snk:load/>

    <script>
        function abrirCentralNotas(nunota) {
            openApp('br.com.sankhya.com.mov.CentralNotas', {NUNOTA: nunota});
        }
    </script>

</head>


<body>
  
    <snk:query var="CabecalhoNota"> 

    WITH RATEIOS AS (
        SELECT 
            RAT.NUFIN,
            RAT.CODCENCUS,
            RAT.PERCRATEIO,
            CR.DESCRCENCUS,
            CR.CODUSURESP
    
        FROM TGFRAT RAT
        JOIN TSICUS CR ON CR.CODCENCUS = RAT.CODCENCUS
        WHERE CR.CODUSURESP =  <%= idUsuario %>
    )

        SELECT DISTINCT

       C.NUNOTA,
       C.NUMNOTA,
       COALESCE (ROUND((C.VLRNOTA * RU.PERCRATEIO)/100, 2),C.VLRNOTA) AS VLRNOTA,
       C.CODEMP,
       E.RAZAOABREV,
       COALESCE(RU.DESCRCENCUS, CR.DESCRCENCUS) as DESCRCENCUS,
       PAR.NOMEPARC,
       CASE 
       WHEN I.NUNICO IS NOT NULL THEN 'Contabilizada'
       ELSE 'Não contabilizada'
       END AS STATUS,
       TO_CHAR(C.DTENTSAI, 'DD/MM/YYYY') AS DTENTSAI

       
 FROM TGFCAB C
 LEFT JOIN TGFPAR PAR ON PAR.CODPARC = C.CODPARC
 LEFT  JOIN TSICUS CR ON CR.CODCENCUS = C.CODCENCUS
  LEFT JOIN TCBINT I
    ON I.NUNICO = C.NUNOTA
   AND I.ORIGEM = 'E'
   LEFT JOIN TSIUSU USU ON USU.CODUSU = CR.CODUSURESP
   LEFT JOIN RATEIOS RU ON RU.NUFIN = C.NUNOTA
  LEFT JOIN TSIEMP E
    ON E.CODEMP=C.CODEMP, TGFTOP T
 WHERE T.CODTIPOPER = C.CODTIPOPER
   AND T.DHALTER = C.DHTIPOPER
   AND T.TIPMOV  IN  ('C' )
   AND TRUNC(C.DTENTSAI) = TRUNC(SYSDATE) - 1 
   AND C.STATUSNOTA = 'L'
   -- AND I.NUNICO IS NULL
   AND (
    -- Notas onde o usuário é responsável pelo centro principal
    CR.CODUSURESP = <%= idUsuario %>
    -- OU notas onde o usuário tem rateio
    OR EXISTS (
        SELECT 1 FROM TGFRAT R
        JOIN TSICUS CR ON CR.CODCENCUS = R.CODCENCUS
        WHERE R.NUFIN = C.NUNOTA 
        AND CR.CODUSURESP = <%= idUsuario %>
    )
)
   
 
    </snk:query>

    
    <main role="main">
        <div class="table-responsive">
            <section class="text-center">
                <div class="container"><br>
                    <h5>Notas Fiscais  não contabilizadas</h5>
                    
                        <table class="table table-bordered table-striped-custom table-condensed-main">

                        <thead class="thead-dark">
                        <tr>
                            <th scope="col">Nro. Único</th>
                            <th scope="col">Nro. Nota</th>
                            <th scope="col">Valor nota</th>
                            <th scope="col">Cod.Empresa</th>
                            <th scope="col">Empresa</th>
                            <th scope="col">Centro de Resultado</th>
                            <th scope="col">Parceiro</th>
                            <th scope="col">Status</th>
                            <th scope="col">Dt.Entrada/saída</th>
                        </tr>
                        </thead>
                        <tbody>
                            <c:forEach items="${CabecalhoNota.rows}" var="row">
                                <tr>
                                    <th scope="row">
                                        <a href="javascript:void(0);" onclick="abrirCentralNotas(<c:out value='${row.NUNOTA}'/>)">
                                            <c:out value="${row.NUNOTA}" />
                                        </a>
                                    </th>
                                    <td><c:out value="${row.NUMNOTA}" /></td>
                                    <td>
                                        <fmt:formatNumber value="${row.VLRNOTA}" type="currency" maxFractionDigits="2"/>
                                    </td>
                                    
                                    <td><c:out value="${row.CODEMP}" /></td>
                                    <td><c:out value="${row.RAZAOABREV}" /></td>
                                    <td><c:out value="${row.DESCRCENCUS}" /></td>
                                    <td><c:out value="${row.NOMEPARC}" /></td>
                                    <td><c:out value="${row.STATUS}" /></td>
                                    <td><c:out value="${row.DTENTSAI}" /></td>
                                </tr>
                            </c:forEach>

                        </tbody>
                    </table>
                </div>
            </section>
        </div>
      </main>
</body>
</html>