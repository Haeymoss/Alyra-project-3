// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
@title Voting contract
@dev This contract allows to create a voting system
@notice The contract is Ownable
*/
contract Voting is Ownable {
    uint public winningProposalID;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping(address => Voter) voters;

    /**
    @dev Event emitted when a voter is registered
    @param voterAddress The address of the voter
    */
    event VoterRegistered(address voterAddress);

    /**
    @dev Event emitted when the workflow status changes
    @param previousStatus The previous status
    @param newStatus The new status
    */
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /**
    @dev Event emitted when a proposal is registered
    @param proposalId The id of the proposal
    */
    event ProposalRegistered(uint proposalId);

    /**
    @dev Event emitted when a voter votes
    @param voter The address of the voter
    @param proposalId The id of the proposal
    */
    event Voted(address voter, uint proposalId);

    constructor() Ownable(msg.sender) {}

    // ::::::::::::: MODIFIERS ::::::::::::: //

    ///@dev Modifier to check if the caller is a voter
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
    @dev Get a voter by address
    @param _addr The address of the voter
    @return Voter The voter
    @notice The caller must be a voter
     */
    function getVoter(
        address _addr
    ) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /**
    @dev Get one proposal by id
    @param _id The id of the proposal
    @return Proposal The proposal
    @notice The caller must be a voter
     */
    function getOneProposal(
        uint _id
    ) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /**
    @dev Add a voter
    @param _addr The address of the voter
    @notice The voter must not be already registered, the workflow status must be RegisteringVoters and the caller must be the owner
    */
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");

        voters[_addr].isRegistered = true;
        votersAddresses.push(_addr);

        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /**
    @dev Add a proposal
    @param _desc The description of the proposal
    @notice The proposal must not be empty and the workflow status must be ProposalsRegistrationStarted
    */
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        ); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        // proposalsArray.push(Proposal(_desc,0));
        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
    @dev Vote for a proposal
    @param _id The id of the proposal
    @notice The voter must not have already voted, the workflow status must be VotingSessionStarted and the proposal must exist
    @notice The vote count of the proposal will be incremented and the winning proposal will be updated if necessary
    */
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);

        if (
            proposalsArray[_id].voteCount >
            proposalsArray[winningProposalID].voteCount
        ) {
            winningProposalID = _id;
        } else {
            winningProposalID = winningProposalID;
        }
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
    @dev Start the registration of voters
    @notice The workflow status must be RegisteringVoters, the caller must be the owner and the workflow status will be changed to ProposalsRegistrationStarted with an event emitted for the change of status
    */
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /**
    @dev End the registration of voters
    @notice The workflow status must be ProposalsRegistrationStarted, the caller must be the owner and the workflow status will be changed to ProposalsRegistrationEnded with an event emitted for the change of status
    */
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /**
    @dev Start the voting session
    @notice The workflow status must be ProposalsRegistrationEnded, the caller must be the owner and the workflow status will be changed to VotingSessionStarted with an event emitted for the change of status
    */
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /**
    @dev End the voting session
    @notice The workflow status must be VotingSessionStarted, the caller must be the owner and the workflow status will be changed to VotingSessionEnded with an event emitted for the change of status
    */
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /**
    @dev Tally the votes

    */
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
