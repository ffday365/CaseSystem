# Rocketmq服务端参数含义及调优





## accessMessageInMemorymaxRatio

默认值：40 int

含义：当Master Broker发现Consumer的消费位点与CommitLog的最新值的差值的容量超过该机器内存的百分比，会推荐Consumer从Slave Broker中去读取数据，降低Master Broker的IO。

调优建议：保持默认值。



## adminBrokerThreadPoolNums

默认值：16 int

含义：服务端处理admin工具的线程数量

调优建议：保持默认值。



## autoCreateSubscriptionGroup

默认值：true bool

含义：服务端是否开放自动创建消费者组

调优建议：生产环境建议关闭。



## autoCreateTopicEnable

默认值：true bool

含义：服务端是否开放自动创建topic

调优建议：生产环境建议关闭。



## bitMapLengthConsumeQueueExt

默认值：64 int

含义：ConsumeQueue扩展过滤bitmap大小

调优建议：保持默认



## brokerFastFailureEnable

默认值：true bool

含义：broker端是否开启快速失败。开启开选项，可在服务端异常时，快速将失败信息返回给客户端，建议开启。

调优建议：保持默认



## brokerPermission

默认值：6  int

含义：broker端的访问权限，6表示可读可写 4表示只读 2表示只写 。在运维节点时可控制节点流量。

调优建议：保持默认



## checkCRCOnRecover

默认值：true  bool

含义：是否在文件恢复时开启crc校验，保持开启即可，防止文件被篡改。

调优建议：保持默认



## cleanFileForciblyEnable

默认值：true  bool

含义：是否开启强制删除过期的存储文件。这项参数关联过期文件的删除，在服务端每日定时清除后，文件占用磁盘空间仍然无法释放(diskSpaceWarningLevelRatio 0.9)，此时可能触发文件的强制删除，即便集群中的消息还没有过期。

调优建议：保持默认

关联参数：deleteWhen、fileReservedTime



## cleanResourceInterval

默认值：10000 int

含义：服务端清理过期文件的线程调用频率

调优建议：保持默认

关联参数：deleteWhen、fileReservedTime



## clientAsyncSemaphoreValue

默认值：65535 int

含义：服务端对客户端异步请求数量的最大阈值。消息异步发送是指消息生产者调用发送的 API 后，无须阻塞等待消息服务器返回本次消息发送结果，只需要提供一个回调函数，供消息发送客户端在收到响应结果回调 。 异步方式相比同步方式，消息发送端的发送性能会显著提高，但为了保护消息服务器的负载压力，RocketMQ 对消息 发送的异步消息进行了井发控制，通 过参数 clientAsyncSemaphoreValue来控制，默认为 65535 。 异步消息发送虽然也可以通过DefaultMQProducer#retryTimesWhenSendAsyncFailed 属性来控制消息重试次数，但是重试的调用入口 是在 收到服务端 响应包时进行的，如果出现网络异常、网络超时等将不会重试 。

调优建议：根据实际请求TPS增加



## clientCallbackExecutorThreads

默认值：Runtime.getRuntime().availableProcessors()

含义：客户端回调线程数。该线程数等于 Netty 通信层回调线程的个数。默认值为 Runtime.getRuntime().availableProcessors()，表示当前有效的CPU个数

调优建议：保持默认



## clientChannelMaxIdleTimeSeconds

默认值：120

含义：客户端每个channel最大等待时间

调优建议：保持默认



## clientCloseSocketIfTimeout

默认值：true

含义：客户端关闭socket是否需要等待

调优建议：保持默认



## clientManagerThreadPoolQueueCapacity

默认值：1000000

含义：客户端管理线程池任务队列初始大小

调优建议：保持默认



## clientManageThreadPoolNums

默认值：32

含义：服务端处理客户端管理（心跳 注册 取消注册线程数量

调优建议：保持默认



## clientOnewaySemaphoreValue

默认值：65535

含义：客户端对invokeOnewayImpl方法的调用控制

调优建议：保持默认



## clientPooledByteBufAllocatorEnable

默认值：false

含义：客户端池化内存是否开启

调优建议：保持默认



## clientSocketRcvBufSize

默认值：0

含义：客户端socket接收缓冲区大小

调优建议：保持默认



## clientSocketSndBufSize

默认值：0

含义：客户端socket发送缓冲区大小

调优建议：保持默认



## clientWorkerThreads

默认值：4

含义：worker线程数

调优建议：保持默认



## clusterTopicEnable

默认值：true

含义：集群名称是否可用在主题使用，开启后开放集群同名topic读写权限。

调优建议：保持默认



## commitCommitLogLeastPages *

默认值：4

含义：一次提交至少需要脏页的数量,默认4页,按照4K一页的大小，最少一次写入到文件的数据是16K。增大该参数，同时配合增大commitCommitLogThoroughInterval，可减少刷盘次数提升性能，相对的，数据可靠性将会对应降低。

调优建议：根据业务实际使用的情况，可以适当减少和增加



## commitCommitLogThoroughInterval *

默认值：200

含义：Commitlog两次提交的最大间隔,如果超过该间隔,将忽略commitCommitLogLeastPages直接提交

调优建议：根据业务实际使用的情况，可以适当减少和增加



## commitIntervalCommitLog *

默认值：200

含义：commitlog提交线程的运行间隔时间，增大该时间可减少刷盘次数。

调优建议：保持默认



## compressedRegister

默认值：false

含义：是否开启producer向broker端注册时的消息压缩。Producer在RocketMQ中向Broker注册时，主要会注册自己所能发送的Topic信息，如果注册信息传输量过大，可能会影响Broker的网络性能和注册处理效率，因此压缩注册的功能可以在一定程度上减轻这种压力。

调优建议：压缩注册也会增加一定的CPU计算负担，因为需要对注册信息进行压缩和解压缩操作。因此，开启压缩注册需要综合考虑网络传输和CPU计算资源之间的平衡。如果网络带宽资源充足但CPU资源紧张，可能会考虑关闭压缩注册。



## connectTimeoutMillis

默认值：3000

含义：表示连接超时时间，即指定连接建立的最长等待时间。当服务端在尝试连接到其他服务（如NameServer、Broker等）时，如果在设定的connectTimeoutMillis时间内未能成功建立连接，连接操作将会超时并失败。

调优建议：保持默认



## consumerFallbehindThreshold

默认值：1024L * 1024 * 1024 * 16

含义：当disableConsumeIfConsumerReadSlowly参数为true时，且当前消费组处于慢消费状态，积压消息超过当前配置项时，禁用该消费组。

```
[PROTECT_BROKER] the consumer[{}] consume slowly, {} bytes, disable it
```

调优建议：保持默认



## disableConsumeIfConsumerReadSlowly

默认值：false

含义：如果消费组消息消费堆积是否禁用该消费组继续消费消息

调优建议：如果项目组使用的场景容易出现慢消费，可开启该选项。



## consumerManagerThreadPoolQueueCapacity

默认值：1000000

含义：该参数用于配置消费者管理线程池的队列容量。具体来说，这个参数控制了消费者管理线程池中任务队列的容量，即可以排队等待执行的任务数量上限。当消费者注册或注销时，会向消费者管理线程池提交任务，如果队列满了，新的任务就会被拒绝执行。通过调整这个参数，可以控制系统在高负载情况下的行为，避免任务堆积导致系统资源耗尽。

调优建议：保持默认



## consumerManageThreadPoolNums

默认值：32

含义：该参数用于配置消费者管理线程池的线程数量。这个参数决定了消费者管理线程池中的线程数目，即用于处理消费者注册、注销等管理操作的线程数量。通过调整这个参数，可以控制消费者管理操作的并发处理能力，从而影响系统对消费者注册和注销等操作的响应速度和并发处理能力。

调优建议：保持默认



## debugLockEnable

默认值：false

含义：是否开启调试锁，当启用调试锁时对于排查一些并发问题非常有用

调优建议：保持默认，开启后对性能有影响



## defaultQueryMaxNum *

默认值：32

含义：消费者消费消息时，一批次从服务端获取消息的最大值

调优建议：根据业务形态调整



## defaultTopicQueueNums

默认值：8

含义：创建topic未指定队列数量时，默认会创建的数量

调优建议：保持默认



## deleteCommitLogFilesInterval

默认值：100

含义：删除commitlog文件的时间间隔，删除一个文件后等一下再删除一个文件

调优建议：保持默认



## deleteConsumeQueueFilesInterval

默认值：100

含义：删除consumequeue文件时间间隔

调优建议：保持默认



## deleteWhen *

默认值：04

含义：磁盘文件空间充足情况下，默认每天什么时候执行删除过期文件，默认04表示凌晨4点

调优建议：保持默认



## destroyMapedFileIntervalForcibly

默认值：120

含义：销毁MappedFile被拒绝的最大存活时间，默认120s。清除过期文件线程在初次销毁mappedfile时，如果该文件被其他线程引用，引用次数大于0.则设置MappedFile的可用状态为false，并设置第一次删除时间，下一次清理任务到达时，如果系统时间大于初次删除时间加上本参数，则将ref次数一次减1000，直到引用次数小于0，则释放物理资源

调优建议：保持默认



## diskFallRecorded

默认值：true

含义：用于配置磁盘利用率是否被记录。当该参数设置为true时，如果磁盘利用率达到了磁盘满阈值，RocketMQ会记录这一事件。这有助于监控和诊断系统中磁盘利用率的变化情况，以便及时采取必要的措施来处理磁盘空间不足的情况。

调优建议：保持默认



## diskMaxUsedSpaceRatio *

默认值：75

含义：commitlog目录所在分区的最大使用比例，如果commitlog目录所在的分区使用比例大于该值，则触发过期文件删除

```
physic disk maybe full soon, so reclaim space, 
```

调优建议：放开配置，保持默认



## duplicationEnable

默认值：false

含义：用于配置消息消费队列中消息重复消费的开关。当 duplicationEnable 设置为 true 时，消息消费队列将允许消息的重复消费；当设置为 false 时，消息将不会被重复消费，确保消费幂等性。

调优建议：保持默认



## enableCalcFilterBitMap

默认值：false

含义：用于配置是否启用消息过滤器的位图索引计算。当 enableCalcFilterBitMap 设置为 true 时，RocketMQ 会在消息过滤时计算位图索引，以提高消息过滤的性能

调优建议：保持默认



## enableConsumeQueueExt

默认值：false

含义：是否启用ConsumeQueue扩展属性，开启后可提高消费的并发能力，但同时会提高磁盘空间的损耗。

调优建议：权衡业务更加看重消费能力还是资源损耗，按需开启。



## enablePropertyFilter

默认值：false

含义：用于开启或关闭消息属性过滤功能。当该参数设置为true时，RocketMQ会启用消息属性过滤功能，允许消费者根据消息的属性进行消息过滤。

调优建议：通常根据tag过滤即可，有需要可开启



## endTransactionPoolQueueCapacity

默认值：100000

含义：用于设置事务消息线程池的队列容量。当生产者发送事务消息时，RocketMQ会使用事务线程池来处理事务消息的提交和回查操作。

调优建议：保持默认



## endTransactionThreadPoolNums

默认值：Math.max(8 + Runtime.getRuntime().availableProcessors() * 2, sendMessageThreadPoolNums * 4);

含义：用于设置事务消息线程池的线程数量。

调优建议：保持默认



## expectConsumerNumUseFilter

默认值：32

含义：布隆过滤器参数

调优建议：保持默认



## fastFailIfNoBufferInStorePool

默认值：false

含义：当消息存储池中没有足够的内存缓冲区可用来写入消息时，如果启用了 fastFailIfNoBufferInStorePool 参数，系统将会快速失败，即拒绝写入消息，从而避免在内存不足的情况下继续写入消息，导致系统过载或性能下降。开启该参数可能会导致部分消息写入失败，这可能会对消息的可靠性和一致性产生一定的影响，因为系统将会丢弃一些消息以保护自身不受内存耗尽的影响。因此，需要权衡系统的容错能力和消息的可靠性，以及对系统性能的要求。

调优建议：保持默认



## fetchNamesrvAddrByAddressServer

默认值：false

含义：是否支持从服务器获取nameServer,而不是config文件中配置的nameServer地址

调优建议：保持默认



## fileReservedTime *

默认值：72

含义：文件保留时间，默认72小时，表示非当前写文件最后一次更新时间加上filereservedtime小与当前时间，该文件将被清理。需要注意的是，这个时间不是一个绝对时间，文件删除还需要配合其他参数使用。

调优建议：保持默认



## filterDataCleanTimeSpan

默认值：24 * 3600 * 1000;

含义：这个参数定义了在 Broker 中清理过期的消费队列过滤数据的时间间隔。过滤数据是为了支持消息过滤功能而存储在 Broker 上的数据，清理这些过期的过滤数据可以帮助释放存储空间，提高系统性能。

调优建议：保持默认



## filterServerNums

默认值：0

含义：配置broker服务器过滤服务器数量

调优建议：保持默认



## filterSupportRetry

默认值：false

含义：表示消息过滤功能将支持消息的重试操作

调优建议：保持默认



## flushCommitLogLeastPages *

默认值：4

含义：一次刷盘至少需要脏页的数量，针对commitlog文件。

调优建议：保持默认



## flushCommitLogTimed *

默认值：true

含义：配置提交日志（CommitLog）定时刷盘的时间间隔。设置该参数后，RocketMQ 会按照指定的时间间隔进行定时刷写操作，将内存中的提交日志刷写到磁盘，以确保数据持久化。这有助于提高数据的可靠性，并且可以减少因为突然断电等情况导致的数据丢失风险。

调优建议：保持默认



## flushConsumeQueueLeastPages *

默认值：2

含义：一次刷盘至少需要脏页的数量,默认2页,针对 Consume文件

调优建议：保持默认



## flushConsumeQueueThoroughInterval *

默认值：1000 * 60

含义：Consume两次刷盘的最大间隔,如果超过该间隔,将忽略

调优建议：保持默认



## flushConsumerOffsetHistoryInterval *

默认值：

含义：

调优建议：保持默认



默认值：

含义：

调优建议：保持默认





