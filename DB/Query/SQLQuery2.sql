SELECT TOP (1000) [Id]
      ,[ContribuyenteId]
      ,[Ncf]
      ,[FechaEmision]
      ,[Monto]
      ,[Itbis18]
      ,[Descripcion]
      ,[CreatedBy]
      ,[Created]
      ,[LastModifiedBy]
      ,[LasModified]
  FROM [DBContribuyentes].[dbo].[comprobantes_fiscales]

INSERT INTO [dbo].[comprobantes_fiscales]
(ContribuyenteId, Ncf, FechaEmision, Monto, Itbis18, Descripcion, CreatedBy, Created)
VALUES
(2,'B0100100001',GETDATE(),15000,2700,'Pago por servicio general',NULL,GETDATE()),
(3,'B0100100002',GETDATE(),35000,6300,'Factura de consultoría',NULL,GETDATE()),
(4,'B0100100003',GETDATE(),18000,3240,'Compra de materiales',NULL,GETDATE()),
(5,'B0100100004',GETDATE(),22000,3960,'Soporte técnico',NULL,GETDATE()),
(6,'B0100100005',GETDATE(),12000,2160,'Gastos administrativos',NULL,GETDATE()),
(7,'B0100100006',GETDATE(),54000,9720,'Servicios profesionales',NULL,GETDATE()),
(8,'B0100100007',GETDATE(),9000,1620,'Servicios varios',NULL,GETDATE()),
(9,'B0100100008',GETDATE(),7500,1350,'Factura regular',NULL,GETDATE()),
(10,'B0100100009',GETDATE(),41000,7380,'Artículos varios',NULL,GETDATE()),
(11,'B0100100010',GETDATE(),28500,5130,'Mantenimiento',NULL,GETDATE()),
(12,'B0100100011',GETDATE(),19500,3510,'Pago de capacitación',NULL,GETDATE()),
(13,'B0100100012',GETDATE(),16000,2880,'Material gastable',NULL,GETDATE()),
(14,'B0100100013',GETDATE(),47000,8460,'Servicios profesionales externos',NULL,GETDATE()),
(15,'B0100100014',GETDATE(),52000,9360,'Compra de equipos',NULL,GETDATE()),
(16,'B0100100015',GETDATE(),8800,1584,'Papelería',NULL,GETDATE()),
(17,'B0100100016',GETDATE(),13400,2412,'Publicidad digital',NULL,GETDATE()),
(18,'B0100100017',GETDATE(),25500,4590,'Instalación de software',NULL,GETDATE()),
(19,'B0100100018',GETDATE(),30500,5490,'Mantenimiento preventivo',NULL,GETDATE()),
(20,'B0100100019',GETDATE(),9800,1764,'Transporte de mercancía',NULL,GETDATE()),
(21,'B0100100020',GETDATE(),26000,4680,'Servicios de mensajería',NULL,GETDATE()),
(22,'B0100100021',GETDATE(),14500,2610,'Reparaciones menores',NULL,GETDATE()),
(23,'B0100100022',GETDATE(),37500,6750,'Capacitación avanzada',NULL,GETDATE()),
(24,'B0100100023',GETDATE(),22000,3960,'Servicios de impresión',NULL,GETDATE()),
(25,'B0100100024',GETDATE(),15800,2844,'Compra de suplidores',NULL,GETDATE()),
(26,'B0100100025',GETDATE(),42000,7560,'Consultoría empresarial',NULL,GETDATE()),
(27,'B0100100026',GETDATE(),38000,6840,'Mejoras tecnológicas',NULL,GETDATE()),
(28,'B0100100027',GETDATE(),26500,4770,'Servicios de desarrollo web',NULL,GETDATE()),
(29,'B0100100028',GETDATE(),19300,3474,'Material eléctrico',NULL,GETDATE()),
(30,'B0100100029',GETDATE(),28700,5166,'Revisión técnica',NULL,GETDATE()),
(31,'B0100100030',GETDATE(),33000,5940,'Gestión de redes sociales',NULL,GETDATE()),
(32,'B0100100031',GETDATE(),21000,3780,'Contratación de personal temporal',NULL,GETDATE()),
(33,'B0100100032',GETDATE(),27500,4950,'Compra de piezas',NULL,GETDATE()),
(34,'B0100100033',GETDATE(),36000,6480,'Proyecto de mejora',NULL,GETDATE()),
(35,'B0100100034',GETDATE(),14900,2682,'Servicios básicos',NULL,GETDATE()),
(36,'B0100100035',GETDATE(),32500,5850,'Gastos de viaje',NULL,GETDATE()),
(37,'B0100100036',GETDATE(),19000,3420,'Horas de soporte',NULL,GETDATE()),
(38,'B0100100037',GETDATE(),47000,8460,'Revisión de sistemas',NULL,GETDATE()),
(39,'B0100100038',GETDATE(),29500,5310,'Eventos y actividades',NULL,GETDATE()),
(40,'B0100100039',GETDATE(),8200,1476,'Material promocional',NULL,GETDATE()),
(41,'B0100100040',GETDATE(),5200,936,'Servicios de limpieza',NULL,GETDATE()),
(42,'B0100100041',GETDATE(),18500,3330,'Alquiler de equipos',NULL,GETDATE()),
(43,'B0100100042',GETDATE(),26800,4824,'Reparación técnica',NULL,GETDATE()),
(44,'B0100100043',GETDATE(),39000,7020,'Servicio de auditoría',NULL,GETDATE()),
(45,'B0100100044',GETDATE(),12000,2160,'Mantenimiento eléctrico',NULL,GETDATE()),
(46,'B0100100045',GETDATE(),15700,2826,'Producción gráfica',NULL,GETDATE()),
(47,'B0100100046',GETDATE(),28000,5040,'Compra de mobiliario',NULL,GETDATE()),
(48,'B0100100047',GETDATE(),34500,6210,'Optimización de procesos',NULL,GETDATE()),
(49,'B0100100048',GETDATE(),9900,1782,'Gastos operativos',NULL,GETDATE()),
(50,'B0100100049',GETDATE(),43000,7740,'Consultoría financiera',NULL,GETDATE()),
(51,'B0100100050',GETDATE(),26500,4770,'Actualización de sistemas',NULL,GETDATE()),
(52,'B0100100051',GETDATE(),28000,5040,'Servicios adicionales',NULL,GETDATE());
