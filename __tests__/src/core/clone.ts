import TFCloneWS from '../../../src/core/clone';
import CloneWorkspace from '../../../src/core/TF';

const mockConfig = {
    baseUrl: 'https://example.com',
    destinationOrgName: 'destinationOrgName',
    sourceWorkspaceId: 'ws-testid',
    userApiToken: 'token',
    newWorkspaceName: 'new_ws_name',
    isCloneValue: true,
}

const mockWSData = {
    "id": "ws-2xS3c3iBa",
    "type": "workspaces",
    "attributes": {
        "allow-destroy-plan": true,
        "auto-apply": false,
        "auto-destroy-at": null,
        "created-at": "2021-03-18T05:46:10.782Z",
        "environment": "default",
        "locked": false,
        "name": "aws-21-caas",
        "queue-all-runs": false,
        "speculative-enabled": true,
        "structured-run-output-enabled": false,
        "terraform-version": "1.0.0",
        "working-directory": "",
        "global-remote-state": true,
        "updated-at": "2022-03-16T08:10:01.795Z",
        "resource-count": 1355,
        "apply-duration-average": 95000,
        "plan-duration-average": 41000,
        "policy-check-failures": 0,
        "run-failures": 9,
        "workspace-kpis-runs-count": 30,
        "latest-change-at": "2022-03-16T08:10:00.046Z",
        "operations": true,
        "execution-mode": "remote",
        "vcs-repo": {
            "branch": "test",
            "ingress-submodules": false,
            "identifier": "test/repo",
            "display-identifier": "test/repo",
            "oauth-token-id": "ot-123sdf",
            "webhook-url": "https://terraform.io/webhooks/vcs/12313",
            "repository-http-url": "https://github.com/test/repo",
            "service-provider": "github_enterprise"
        },
        "vcs-repo-identifier": "test/repo",
        "permissions": {
            "can-update": true,
            "can-destroy": true,
            "can-queue-destroy": true,
            "can-queue-run": true,
            "can-queue-apply": true,
            "can-read-state-versions": true,
            "can-create-state-versions": true,
            "can-read-variable": true,
            "can-update-variable": true,
            "can-lock": true,
            "can-unlock": true,
            "can-force-unlock": true,
            "can-read-settings": true,
            "can-manage-tags": true
        },
        "actions": {
            "is-destroyable": true
        },
        "description": null,
        "file-triggers-enabled": false,
        "trigger-prefixes": [],
        "source": "tfe-ui",
        "source-name": null,
        "source-url": null,
        "tag-names": []
    }
}

jest.mock('../../../src/core/TF')
const MockedCloneWorkspace = jest.mocked(CloneWorkspace, true);
const cloneWS = new TFCloneWS(mockConfig)

test('Should start the setup process', async () => {
    MockedCloneWorkspace.prototype.searchWorkspace.mockReturnValueOnce(Promise.resolve({ data: [] }))
    MockedCloneWorkspace.prototype.fetchWorkspaceById.mockReturnValueOnce(Promise.resolve({ data: mockWSData}))
    MockedCloneWorkspace.prototype.fetchWorkspaceVars.mockReturnValueOnce(Promise.resolve({ data: [mockWSData] }))
    await cloneWS.setup()
    expect(MockedCloneWorkspace.prototype.searchWorkspace).toHaveBeenCalledTimes(1)
    expect(MockedCloneWorkspace.prototype.fetchWorkspaceById).toHaveBeenCalledTimes(1)
    expect(MockedCloneWorkspace.prototype.fetchWorkspaceVars).toHaveBeenCalledTimes(1)
});

// const MockedCloneWorkspace = CloneWorkspace as jest.MockedClass<typeof CloneWorkspace>;

// describe('clone', function () {
//     const cloneWS = new TFCloneWS(mockConfig)

//     beforeAll(() => {
//     })

//     describe('clone setup', () => {
//         it('Should start the setup process', () => {
//             MockedCloneWorkspace.prototype.searchWorkspace.mockReturnValueOnce(Promise.resolve({data: []}))
//             cloneWS.setup()
//             expect(MockedCloneWorkspace.prototype.searchWorkspace).toHaveBeenCalledTimes(1)
//         })
//     })
// })