type OutboundMode = 'rule' | 'global' | 'direct'
type LogLevel = 'info' | 'debug' | 'warning' | 'error' | 'silent'
type SysProxyMode = 'auto' | 'manual'
type CardStatus = 'col-span-2' | 'col-span-1' | 'hidden'
type AppTheme = 'system' | 'light' | 'dark'
type MihomoGroupType = 'Selector' | 'URLTest' | 'LoadBalance' | 'Relay'
type Priority =
  | 'PRIORITY_LOW'
  | 'PRIORITY_BELOW_NORMAL'
  | 'PRIORITY_NORMAL'
  | 'PRIORITY_ABOVE_NORMAL'
  | 'PRIORITY_HIGH'
  | 'PRIORITY_HIGHEST'
type MihomoProxyType =
  | 'Direct'
  | 'Reject'
  | 'RejectDrop'
  | 'Pass'
  | 'Dns'
  | 'Compatible'
  | 'Socks5'
  | 'Http'
  | 'Ssh'
  | 'Shadowsocks'
  | 'ShadowsocksR'
  | 'Snell'
  | 'Vmess'
  | 'Vless'
  | 'Trojan'
  | 'Hysteria'
  | 'Hysteria2'
  | 'Tuic'
  | 'WireGuard'
type TunStack = 'gvisor' | 'mixed' | 'system'
type FindProcessMode = 'off' | 'strict' | 'always'
type DnsMode = 'normal' | 'fake-ip' | 'redir-host'
type FilterMode = 'blacklist' | 'whitelist'
type NetworkInterfaceInfo = os.NetworkInterfaceInfo
type Fingerprints =
  | 'random'
  | 'randomized'
  | 'chrome'
  | 'chrome_psk'
  | 'chrome_psk_shuffle'
  | 'chrome_padding_psk_shuffle'
  | 'chrome_pq'
  | 'chrome_pq_psk'
  | 'firefox'
  | 'safari'
  | 'ios'
  | 'android'
  | 'edge'
  | '360'
  | 'qq'

interface IAppVersion {
  version: string
  changelog: string
}

interface IMihomoVersion {
  version: string
  meta: boolean
}

interface IMihomoConfigs {
  port: number
  'socks-port': number
  'redir-port': number
  'tproxy-port': number
  'mixed-port': number
  tun: IMihomoTunDetail
  'allow-lan': boolean
  'skip-auth-prefixes': string[]
  'lan-allowed-ips': string[]
  'lan-disallowed-ips': string[]
  'bind-address': string
  'interface-name': string
  mode: OutboundMode
  'unified-delay': boolean
  'log-level': LogLevel
  ipv6: boolean
  'routing-mark': number
  'tcp-concurrent': boolean
  'find-process-mode': FindProcessMode
  'geodata-mode': boolean
  'global-client-fingerprint': Fingerprints
  'global-ua': string
  'etag-support': boolean
  'keep-alive-idle': number
  'keep-alive-interval': number
  'disable-keep-alive': boolean
  sniffing: boolean
}

interface IMihomoTunDetail {
  enable: boolean
  stack: TunStack
  'auto-route': boolean
  'auto-redirect'?: boolean
  'auto-detect-interface': boolean
  'dns-hijack': string[]
  device: string
  mtu: number
  'inet4-address': string[]
  'inet6-address': string[]
}

interface IMihomoTrafficInfo {
  up: number
  down: number
}

interface IMihomoMemoryInfo {
  inuse: number
  oslimit: number
}

interface IMihomoLogInfo {
  type: LogLevel
  payload: string
  time?: string
}

interface IMihomoRulesInfo {
  rules: IMihomoRulesDetail[]
}

interface IMihomoRulesDetail {
  type: string
  payload: string
  proxy: string
  size: number
}

interface IMihomoConnectionsInfo {
  downloadTotal: number
  uploadTotal: number
  connections?: IMihomoConnectionDetail[]
  memory: number
}

interface IMihomoConnectionDetail {
  id: string
  isActive: boolean
  metadata: {
    network: 'tcp' | 'udp'
    type: string
    sourceIP: string
    sourceGeoIP: string[]
    sourceIPASN: string
    destinationIP: string
    destinationGeoIP: string[]
    destinationIPASN: string
    sourcePort: string
    destinationPort: string
    inboundIP: string
    inboundPort: string
    inboundName: string
    inboundUser: string
    host: string
    dnsMode: string
    uid: number
    process: string
    processPath: string
    specialProxy: string
    specialRules: string
    remoteDestination: string
    dscp: number
    sniffHost: string
  }
  uploadSpeed?: number
  downloadSpeed?: number
  upload: number
  download: number
  start: string
  chains: string[]
  rule: string
  rulePayload: string
}

interface IMihomoHistory {
  time: string
  delay: number
}

type IMihomoGroupDelay = Record<string, number>

interface IMihomoDelay {
  delay?: number
  message?: string
}

interface IMihomoProxy {
  alive: boolean
  extra: Record<string, { alive: boolean; history: IMihomoHistory[] }>
  history: IMihomoHistory[]
  id: string
  name: string
  tfo: boolean
  type: MihomoProxyType
  udp: boolean
  xudp: boolean
}

interface IMihomoGroup {
  alive: boolean
  all: string[]
  extra: Record<string, { alive: boolean; history: IMihomoHistory[] }>
  testUrl?: string
  fixed?: string
  hidden: boolean
  history: IMihomoHistory[]
  icon: string
  name: string
  now: string
  tfo: boolean
  type: MihomoGroupType
  udp: boolean
  xudp: boolean
}

interface IMihomoProxies {
  proxies: Record<string, IMihomoProxy | IMihomoGroup>
}

interface IMihomoMixedGroup extends IMihomoGroup {
  all: (IMihomoProxy | IMihomoGroup)[]
}

interface IMihomoRuleProviders {
  providers: Record<string, IMihomoRuleProvider>
}

interface IMihomoRuleProvider {
  behavior: string
  format: string
  name: string
  ruleCount: number
  type: string
  updatedAt: string
  vehicleType: string
}

interface IMihomoProxyProviders {
  providers: Record<string, IMihomoProxyProvider>
}

interface ISubscriptionUserInfoUpper {
  Upload: number
  Download: number
  Total: number
  Expire: number
}

interface IMihomoProxyProvider {
  name: string
  type: string
  proxies?: IMihomoProxy[]
  subscriptionInfo?: ISubscriptionUserInfoUpper
  expectedStatus: string
  testUrl?: string
  updatedAt?: string
  vehicleType: string
}

interface ISysProxyConfig {
  enable: boolean
  host?: string
  mode?: SysProxyMode
  bypass?: string[]
  pacScript?: string
}

interface IHost {
  domain: string
  value: string | string[]
}

interface IAppConfig {
  updateChannel: 'stable' | 'beta'
  core: 'mihomo' | 'mihomo-alpha'
  disableLoopbackDetector: boolean
  disableEmbedCA: boolean
  disableSystemCA: boolean
  disableNftables: boolean
  safePaths: string[]
  proxyDisplayMode: 'simple' | 'full'
  proxyDisplayOrder: 'default' | 'delay' | 'name'
  profileDisplayDate?: 'expire' | 'update'
  envType?: ('bash' | 'cmd' | 'powershell' | 'nushell')[]
  proxyCols: 'auto' | '1' | '2' | '3' | '4'
  connectionDirection: 'asc' | 'desc'
  connectionOrderBy: 'time' | 'upload' | 'download' | 'uploadSpeed' | 'downloadSpeed' | 'process'
  spinFloatingIcon?: boolean
  disableTray?: boolean
  showFloatingWindow?: boolean
  connectionCardStatus?: CardStatus
  dnsCardStatus?: CardStatus
  logCardStatus?: CardStatus
  pauseSSID?: string[]
  mihomoCoreCardStatus?: CardStatus
  overrideCardStatus?: CardStatus
  profileCardStatus?: CardStatus
  proxyCardStatus?: CardStatus
  resourceCardStatus?: CardStatus
  ruleCardStatus?: CardStatus
  sniffCardStatus?: CardStatus
  substoreCardStatus?: CardStatus
  sysproxyCardStatus?: CardStatus
  tunCardStatus?: CardStatus
  githubToken?: string
  useSubStore: boolean
  subStoreHost?: string
  subStoreBackendSyncCron?: string
  subStoreBackendDownloadCron?: string
  subStoreBackendUploadCron?: string
  autoQuitWithoutCore?: boolean
  autoQuitWithoutCoreDelay?: number
  useCustomSubStore?: boolean
  useProxyInSubStore?: boolean
  mihomoCpuPriority?: Priority
  customSubStoreUrl?: string
  diffWorkDir?: boolean
  autoSetDNS?: boolean
  originDNS?: string
  useWindowFrame: boolean
  proxyInTray: boolean
  siderOrder: string[]
  siderWidth: number
  appTheme: AppTheme
  customTheme?: string
  autoCheckUpdate: boolean
  silentStart: boolean
  autoCloseConnection: boolean
  sysProxy: ISysProxyConfig
  maxLogDays: number
  userAgent?: string
  delayTestConcurrency?: number
  delayTestUrl?: string
  delayTestTimeout?: number
  encryptedPassword?: number[]
  controlDns?: boolean
  controlSniff?: boolean
  useDockIcon?: boolean
  showTraffic?: boolean
  webdavUrl?: string
  webdavDir?: string
  webdavUsername?: string
  webdavPassword?: string
  hosts: IHost[]
  showWindowShortcut?: string
  showFloatingWindowShortcut?: string
  triggerSysProxyShortcut?: string
  triggerTunShortcut?: string
  ruleModeShortcut?: string
  globalModeShortcut?: string
  directModeShortcut?: string
  restartAppShortcut?: string
  quitWithoutCoreShortcut?: string
  onlyActiveDevice?: boolean
  networkDetection?: boolean
  networkDetectionBypass?: string[]
  networkDetectionInterval?: number
  displayIcon?: boolean
  displayAppName?: boolean
  disableGPU: boolean
  disableAnimation?: boolean
}

interface IMihomoTunConfig {
  enable?: boolean
  stack?: TunStack
  'auto-route'?: boolean
  'auto-redirect'?: boolean
  'auto-detect-interface'?: boolean
  'dns-hijack'?: string[]
  device?: string
  mtu?: number
  'strict-route'?: boolean
  gso?: boolean
  'gso-max-size'?: number
  'udp-timeout'?: number
  'iproute2-table-index'?: number
  'iproute2-rule-index'?: number
  'endpoint-independent-nat'?: boolean
  'route-address-set'?: string[]
  'route-exclude-address-set'?: string[]
  'route-address'?: string[]
  'route-exclude-address'?: string[]
  'include-interface'?: string[]
  'exclude-interface'?: string[]
  'include-uid'?: number[]
  'include-uid-range'?: string[]
  'exclude-uid'?: number[]
  'exclude-uid-range'?: string[]
  'include-android-user'?: string[]
  'include-package'?: string[]
  'exclude-package'?: string[]
}
interface IMihomoDNSConfig {
  enable?: boolean
  listen?: string
  ipv6?: boolean
  'ipv6-timeout'?: number
  'prefer-h3'?: boolean
  'enhanced-mode'?: DnsMode
  'fake-ip-range'?: string
  'fake-ip-filter'?: string[]
  'fake-ip-filter-mode'?: FilterMode
  'use-hosts'?: boolean
  'use-system-hosts'?: boolean
  'respect-rules'?: boolean
  'default-nameserver'?: string[]
  nameserver?: string[]
  fallback?: string[]
  'fallback-filter'?: { [key: string]: boolean | string | string[] }
  'proxy-server-nameserver'?: string[]
  'direct-nameserver'?: string[]
  'direct-nameserver-follow-policy'?: boolean
  'nameserver-policy'?: { [key: string]: string | string[] }
  'cache-algorithm'?: string
}

interface IMihomoSnifferConfig {
  enable?: boolean
  'parse-pure-ip'?: boolean
  'override-destination'?: boolean
  'force-dns-mapping'?: boolean
  'force-domain'?: string[]
  'skip-domain'?: string[]
  'skip-dst-address'?: string[]
  'skip-src-address'?: string[]
  sniff?: {
    HTTP?: {
      ports: (number | string)[]
      'override-destination'?: boolean
    }
    TLS?: {
      ports: (number | string)[]
    }
    QUIC?: {
      ports: (number | string)[]
    }
  }
}

interface IMihomoProfileConfig {
  'store-selected'?: boolean
  'store-fake-ip'?: boolean
}

interface IMihomoConfig {
  'external-controller-pipe': string
  'external-controller-unix': string
  'external-controller': string
  'external-ui': string
  'external-ui-url': string
  'external-controller-cors'?: {
    'allow-origins'?: string[]
    'allow-private-network'?: boolean
  }
  secret?: string
  ipv6: boolean
  mode: OutboundMode
  'mixed-port': number
  'allow-lan': boolean
  'unified-delay': boolean
  'tcp-concurrent': boolean
  'interface-name': string
  'global-client-fingerprint': Fingerprints
  'log-level': LogLevel
  'find-process-mode': FindProcessMode
  'socks-port'?: number
  'redir-port'?: number
  'tproxy-port'?: number
  'keep-alive-idle': number
  'keep-alive-interval': number
  'disable-keep-alive': boolean
  'skip-auth-prefixes'?: string[]
  'bind-address'?: string
  'lan-allowed-ips'?: string[]
  'lan-disallowed-ips'?: string[]
  authentication: string[]
  port?: number
  proxies?: []
  'proxy-groups'?: []
  rules?: []
  hosts?: { [key: string]: string | string[] }
  'geodata-mode'?: boolean
  'geo-auto-update'?: boolean
  'geo-update-interval'?: number
  'geox-url'?: {
    geoip?: string
    geosite?: string
    mmdb?: string
    asn?: string
  }
  tun: IMihomoTunConfig
  dns: IMihomoDNSConfig
  sniffer: IMihomoSnifferConfig
  profile: IMihomoProfileConfig
  'rule-providers'?: Record<string, unknown>
  'proxy-providers'?: Record<string, unknown>
}

interface ProxyProviderConfig {
  path?: string
  url?: string
}

interface IProfileConfig {
  current?: string
  items: IProfileItem[]
}

interface IOverrideItem {
  id: string
  type: 'remote' | 'local'
  ext: 'js' | 'yaml'
  name: string
  updated: number
  global?: boolean
  url?: string
  file?: string
}

interface IOverrideConfig {
  items: IOverrideItem[]
}

interface ISubscriptionUserInfo {
  upload: number
  download: number
  total: number
  expire: number
}

interface IProfileItem {
  id: string
  type: 'remote' | 'local'
  name: string
  url?: string // remote
  file?: string // local
  interval?: number
  home?: string
  updated?: number
  override?: string[]
  useProxy?: boolean
  extra?: ISubscriptionUserInfo
  substore?: boolean
}

interface ISubStoreSub {
  name: string
  displayName?: string
  icon?: string
  tag?: string[]
}

declare module 'file-icon'
